# Deploying craftmint.in to a Hostinger VPS

One-time setup checklist. Run VPS commands over SSH as a non-root sudo user
(create one first if you're dropped in as root — `adduser deploy && usermod -aG sudo deploy`).

## 0. Buy the VPS and point the domain

1. In hPanel, order a **KVM 1** VPS, choose **Ubuntu 22.04/24.04 LTS**, set a root password/SSH key.
2. Note the VPS's public IP.
3. Point `craftmint.in` at it:
   - If the domain is registered with Hostinger: hPanel → Domains → craftmint.in → DNS / Nameservers → add an **A record** `@` → VPS IP, and **A record** `www` → VPS IP.
   - If registered elsewhere: same thing, in that registrar's DNS settings.
   - DNS can take up to 24h to propagate; usually much faster.

## 1. Install the base stack (on the VPS)

```bash
sudo apt update && sudo apt upgrade -y

# Node.js 20 LTS (Next.js 16 here requires >=20.9.0)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs nginx git

node -v   # confirm >= 20.9.0

sudo npm install -g pm2
```

## 2. Get the code onto the server

```bash
sudo mkdir -p /var/www/craftmint
sudo chown $USER:$USER /var/www/craftmint
git clone <your-repo-url> /var/www/craftmint
cd /var/www/craftmint
```

(No GitHub repo yet? `scp -r` the project folder to the server instead, excluding
`node_modules` and `.next`.)

## 3. Configure environment

```bash
cp .env.local.example .env.local
nano .env.local
```

Set **real** values — not the placeholders:
- `ADMIN_PASSWORD` — a strong password for `/admin`
- `ADMIN_SESSION_SECRET` — a long random string, e.g. `openssl rand -hex 32`

## 4. First build and start

```bash
npm ci
npm run build

sudo mkdir -p /var/log/craftmint
sudo chown $USER:$USER /var/log/craftmint

pm2 start deploy/ecosystem.config.js
pm2 save
pm2 startup   # run the command it prints (registers PM2 to start on reboot)
```

App is now running on `127.0.0.1:3000`. Verify: `curl http://localhost:3000`

## 5. Nginx + HTTPS

```bash
sudo cp deploy/nginx-craftmint.conf /etc/nginx/sites-available/craftmint.in
sudo ln -s /etc/nginx/sites-available/craftmint.in /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx

# Free SSL cert, and Nginx auto-config for HTTPS + redirect:
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d craftmint.in -d www.craftmint.in
```

Certbot auto-renews via a systemd timer — no action needed. Confirm anytime with
`sudo certbot renew --dry-run`.

Visit `https://craftmint.in` — it should be live.

## 6. Firewall

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

## 7. Back up the data regularly

The app's only persistent data is `lib/db/*.json` (projects/leads/articles/etc.)
and `public/uploads/` (admin-uploaded images) — plain files on this server's disk,
not a managed database. Back them up:

```bash
crontab -e
# add:
0 3 * * * /var/www/craftmint/deploy/backup.sh >> /var/log/craftmint/backup.log 2>&1
```

This keeps the last 14 daily backups in `~/craftmint-backups`. Copy that directory
off the VPS periodically (e.g. to your laptop or cloud storage) — a backup that
only lives on the same disk as the data doesn't protect against disk failure.

## Redeploying after future changes

```bash
cd /var/www/craftmint
git pull
./deploy/deploy.sh
```

This rebuilds and does a zero-downtime PM2 reload. It never touches `lib/db/`
or `public/uploads/`, so admin-entered data and uploaded images are untouched.

## Useful commands

- `pm2 status` — is the app running
- `pm2 logs craftmint` — live logs
- `pm2 restart craftmint` — hard restart (brief downtime)
- `sudo systemctl status nginx` — is Nginx up
- `sudo tail -f /var/log/nginx/error.log` — Nginx errors
