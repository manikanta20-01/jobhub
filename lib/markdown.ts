import 'server-only';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

// ================= TYPES =================

export interface Job {
  id: string;
  slug: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  date: string;
  tags: string[];
  description: string;
  applyLink?: string | null;
  logo?: string | null;
  banner?: string | null;
  content: string;
  htmlContent: string;
  daysAgo?: number;
}

export interface Page {
  slug: string;
  title: string;
  description: string;
  content: string;
  htmlContent: string;
}

// ================= CONFIG =================

const AUTO_DELETE_DAYS = 30; // Jobs older than this will be filtered out

// ================= PATHS =================

const jobsDirectory = path.join(process.cwd(), 'content/jobs');
const pagesDirectory = path.join(process.cwd(), 'content/pages');

// ================= DATE HELPERS =================

/**
 * Calculate days ago from a date string
 */
export function getDaysAgo(dateString: string): number {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Check if a job is older than the auto-delete threshold
 */
export function isJobExpired(dateString: string): boolean {
  const daysAgo = getDaysAgo(dateString);
  return daysAgo > AUTO_DELETE_DAYS;
}

// ================= JOB FUNCTIONS =================

// Get all job folder names
export function getAllJobSlugs(): string[] {
  if (!fs.existsSync(jobsDirectory)) return [];

  return fs.readdirSync(jobsDirectory).filter((folder) => {
    const fullPath = path.join(jobsDirectory, folder);
    return fs.statSync(fullPath).isDirectory();
  });
}

// Get single job
export function getJobBySlug(slug?: string): Job | null {
  if (!slug) return null;

  const fullPath = path.join(jobsDirectory, slug, 'index.md');

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const htmlContent = marked.parse(content) as string;

  // Check if job is expired (auto-delete feature)
  const daysAgo = getDaysAgo(data.date || new Date().toISOString());
  if (daysAgo > AUTO_DELETE_DAYS) {
    return null; // Filter out expired jobs
  }

  // Ensure date is a string (gray-matter may parse dates as Date objects)
  const dateString = data.date
    ? data.date instanceof Date
      ? data.date.toISOString().split('T')[0]
      : String(data.date)
    : '';

  return {
    id: data.id || slug,
    slug,
    title: data.title || '',
    company: data.company || '',
    location: data.location || '',
    salary: data.salary || '',
    date: dateString,
    tags: data.tags || [],
    description: data.description || '',
    applyLink: data.applyLink || null,
    logo: data.logo || null,
    banner: data.banner || null,
    content,
    htmlContent,
    daysAgo,
  };
}

// Get all jobs (auto-filtered for expired)
export function getAllJobs(): Job[] {
  const jobs = getAllJobSlugs()
    .map((slug) => getJobBySlug(slug))
    .filter((job): job is Job => job !== null)
    .sort(
      (a, b) =>
        new Date(b.date || 0).getTime() -
        new Date(a.date || 0).getTime()
    );

  return jobs;
}

// Latest jobs (respects auto-delete)
export function getLatestJobs(count: number = 5): Job[] {
  return getAllJobs().slice(0, count);
}

// ================= FILTER / SEARCH =================

export function searchJobs(query: string): Job[] {
  const lowerQuery = query.toLowerCase();

  return getAllJobs().filter((job) => {
    return (
      job.title.toLowerCase().includes(lowerQuery) ||
      job.company.toLowerCase().includes(lowerQuery) ||
      job.location.toLowerCase().includes(lowerQuery) ||
      job.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      job.description.toLowerCase().includes(lowerQuery)
    );
  });
}

export function filterJobs(
  location?: string,
  tags?: string[]
): Job[] {
  let jobs = getAllJobs();

  if (location && location !== 'all' && location.trim() !== '') {
    jobs = jobs.filter((job) =>
      job.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  if (tags && tags.length > 0 && !tags.includes('all')) {
    jobs = jobs.filter((job) =>
      tags.some((tag) =>
        job.tags.some((jobTag) =>
          jobTag.toLowerCase() === tag.toLowerCase()
        )
      )
    );
  }

  return jobs;
}

// Get filtered jobs by multiple criteria
export function getFilteredJobs({
  search,
  location,
  tags,
  sort = 'latest',
}: {
  search?: string;
  location?: string;
  tags?: string[];
  sort?: 'latest' | 'oldest';
}): Job[] {
  let jobs = getAllJobs();

  // Apply search filter
  if (search && search.trim()) {
    const lowerQuery = search.toLowerCase();
    jobs = jobs.filter((job) =>
      job.title.toLowerCase().includes(lowerQuery) ||
      job.company.toLowerCase().includes(lowerQuery) ||
      job.location.toLowerCase().includes(lowerQuery) ||
      job.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      job.description.toLowerCase().includes(lowerQuery)
    );
  }

  // Apply location filter
  if (location && location !== 'all') {
    jobs = jobs.filter((job) =>
      job.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  // Apply tags filter
  if (tags && tags.length > 0 && !tags.includes('all')) {
    jobs = jobs.filter((job) =>
      tags.some((tag) =>
        job.tags.some((jobTag) =>
          jobTag.toLowerCase() === tag.toLowerCase()
        )
      )
    );
  }

  // Apply sorting
  if (sort === 'oldest') {
    jobs = [...jobs].reverse();
  }

  return jobs;
}

// ================= TAGS & LOCATIONS =================

export function getAllTags(): string[] {
  const tagsSet = new Set<string>();

  getAllJobs().forEach((job) => {
    job.tags.forEach((tag) => tagsSet.add(tag));
  });

  return Array.from(tagsSet).sort();
}

export function getAllLocations(): string[] {
  const locationsSet = new Set<string>();

  getAllJobs().forEach((job) => {
    const location = job.location?.split('/')[0]?.trim();
    if (location) locationsSet.add(location);
  });

  return Array.from(locationsSet).sort();
}

// Get unique categories from tags
export function getAllCategories(): string[] {
  const categories = ['IT', 'Non-IT', 'Data Science', 'Marketing', 'Sales', 'HR', 'Finance', 'Design'];
  const availableTags = getAllTags();

  // Return categories that exist in the tags
  return categories.filter((cat) =>
    availableTags.some((tag) => tag.toLowerCase().includes(cat.toLowerCase()))
  );
}

// ================= PAGES =================

// Get single page (privacy, terms, etc.)
export function getPageBySlug(slug: string): Page | null {
  if (!slug) return null;

  const fullPath = path.join(pagesDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const htmlContent = marked.parse(content) as string;

  return {
    slug,
    title: data.title || slug,
    description: data.description || '',
    content,
    htmlContent,
  };
}

// Get all page slugs
export function getAllPageSlugs(): string[] {
  if (!fs.existsSync(pagesDirectory)) return [];

  return fs.readdirSync(pagesDirectory)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''));
}

// ================= STATIC PARAMS =================

// For /jobs/[slug]
export function getStaticJobParams() {
  return getAllJobSlugs().map((slug) => ({ slug }));
}

// For static pages
export function getStaticPageParams() {
  return getAllPageSlugs().map((slug) => ({ slug }));
}
