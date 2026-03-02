import axios from 'axios';
import { Job } from '../types';
import uuid from 'react-native-uuid';

const API_BASE_URL = 'https://empllo.com/api/v1';

// Helper function to strip HTML tags and convert to plain text
const stripHtmlTags = (html: string): string => {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, '') // Remove all HTML tags
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
};

// Helper function to extract text from HTML and convert to bullet points
const htmlToPlainText = (html: string): string => {
  if (!html) return '';
  
  // Replace closing tags with newlines
  let text = html
    .replace(/<\/li>/g, '\n')
    .replace(/<\/p>/g, '\n')
    .replace(/<li>/g, '• ')
    .replace(/<h[1-6]>|<\/h[1-6]>/g, '\n')
    .replace(/<\/?[^>]+(>|$)/g, ''); // Remove remaining HTML tags
  
  // Clean up extra whitespace
  text = text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n');
  
  return text;
};

export const fetchJobs = async (): Promise<Job[]> => {
  try {
    const response = await axios.get(API_BASE_URL);
    
    // Extract jobs array from the response
    const jobs = response.data.jobs || [];
    
    // Map API jobs to our Job type and add unique IDs
    const jobsWithIds = jobs.map((job: any) => ({
      id: uuid.v4() as string,
      title: job.title,
      company: job.companyName,
      location: job.locations[0] || 'Remote',
      salary: job.minSalary && job.maxSalary 
        ? `${job.minSalary}-${job.maxSalary} ${job.currency}` 
        : 'Not specified',
      type: job.jobType,
      description: htmlToPlainText(job.description || ''),
      tags: job.tags || [],
      applicationLink: job.applicationLink,
      companyLogo: job.companyLogo,
    }));

    return jobsWithIds;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw new Error('Failed to fetch jobs. Please try again later.');
  }
};