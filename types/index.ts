// Central type definitions for the Craftmint data layer.
// Keeping these in one place means every data source (generated JSON,
// hand-curated finish/project data, the local JSON "database" used for
// leads/samples) speaks the same shapes, and can later be swapped for a
// real database (Supabase et al.) without touching the UI layer.

export type FinishCategory =
  | "Decorative"
  | "Textured"
  | "Polished"
  | "Concrete"
  | "Stone"
  | "Metallic"
  | "Stucco"
  | "Mineral"
  | "Flooring"
  | "Exterior";

export type TextureType = "Smooth" | "Fine" | "Medium" | "Rough" | "Heavy" | "Sculptural";

export type Sheen = "Matte" | "Satin" | "Mid-sheen" | "Polished" | "Gloss";

export type FinishStyle =
  | "Minimal"
  | "Natural"
  | "Industrial"
  | "Luxury"
  | "Organic"
  | "Contemporary"
  | "Artistic";

export type ApplicationArea =
  | "Residential"
  | "Hospitality"
  | "Retail"
  | "Office"
  | "Commercial"
  | "Exterior"
  | "Floor";

export type ColourFamily =
  | "White"
  | "Beige"
  | "Sand"
  | "Grey"
  | "Brown"
  | "Terracotta"
  | "Green"
  | "Blue"
  | "Dark"
  | "Metallic";

export interface ColourSwatch {
  id: string;
  image: string;
  label: string;
  colourFamily: ColourFamily;
}

export interface Finish {
  id: string;
  slug: string;
  name: string;
  category: FinishCategory;
  textureType: TextureType;
  sheen: Sheen;
  styles: FinishStyle[];
  applications: ApplicationArea[];
  colourFamilies: ColourFamily[];
  description: string;
  characterNote: string;
  heroImage: string;
  applicationImages: string[];
  swatches: ColourSwatch[];
  technicalNotes: Partial<TechnicalInfo>;
  featured: boolean;
  published: boolean;
}

export interface TechnicalInfo {
  description: string;
  application: string;
  surfacePreparation: string;
  coverage: string;
  drying: string;
  maintenance: string;
  technicalData: string;
  sustainability: string;
  installation: string;
}

export type ProjectType =
  | "Residential"
  | "Hospitality"
  | "Restaurant"
  | "Retail"
  | "Office"
  | "Commercial"
  | "Villa"
  | "Apartment"
  | "Flooring"
  | "Exterior";

export interface ProjectImage {
  id: string;
  url: string;
  caption?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  location: string;
  city: string;
  state: string;
  country: string;
  projectType: ProjectType[];
  year: number | null;
  architect: string;
  designer: string;
  client: string;
  description: string;
  challenge: string;
  approach: string;
  solution: string;
  finishSlugs: string[];
  productsUsed: string;
  colour: string;
  area: string;
  coverImage: string;
  galleryImages: ProjectImage[];
  detailImages: ProjectImage[];
  beforeAfterImages: ProjectImage[];
  videoUrl: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export type LeadStatus = "New" | "Contacted" | "Qualified" | "Converted" | "Closed";

export interface Lead {
  id: string;
  name: string;
  email: string;
  mobile: string;
  timestamp: string;
  source: string;
  page: string;
  status: LeadStatus;
}

export interface SampleRequest {
  id: string;
  name: string;
  email: string;
  mobile: string;
  company: string;
  projectType: string;
  projectLocation: string;
  finishSlug: string;
  colourSwatchId: string;
  estimatedArea: string;
  message: string;
  timestamp: string;
  status: LeadStatus;
}

export type ResourceCategory =
  | "Technical Data"
  | "Application Guides"
  | "Colour Guides"
  | "Brochures"
  | "Installation Guides"
  | "Maintenance"
  | "Product Documents"
  | "Specification Documents";

export interface Resource {
  id: string;
  title: string;
  category: ResourceCategory;
  description: string;
  fileType: string;
  fileUrl: string;
  published: boolean;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  topic: string;
  excerpt: string;
  coverImage: string;
  body: string;
  published: boolean;
  createdAt: string;
}
