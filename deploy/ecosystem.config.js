// PM2 process config for craftmint.in
// Usage on the VPS: pm2 start deploy/ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "craftmint",
      cwd: __dirname + "/..",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      instances: 1,
      autorestart: true,
      max_memory_restart: "1G",
      out_file: "/var/log/craftmint/out.log",
      error_file: "/var/log/craftmint/error.log",
      time: true,
    },
  ],
};
