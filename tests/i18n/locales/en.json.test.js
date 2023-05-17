import en from "@/i18n/locales/en.json";
import { describe, it, expect } from 'vitest';

describe('en.json', () => {
  it('should have the expected locale translation keys', () => {
    expect('en' in en.locale).toBe(true);
    expect('fr' in en.locale).toBe(true);
  });

  it('should have the expected jobs translation keys', () => {
    expect('search' in en.jobs).toBe(true);
  });

  it('should have the expected nav translation keys', () => {
    expect('home' in en.nav).toBe(true);
    expect('jobApplicant' in en.nav).toBe(true);
    expect('new' in en.nav).toBe(true);
    expect('smNew' in en.nav).toBe(true);
    expect('update' in en.nav).toBe(true);
    expect('delete' in en.nav).toBe(true);
    expect('menu' in en.nav).toBe(true);
    expect('info' in en.nav).toBe(true);
  });

  it('should have the expected header translation keys', () => { 
    expect('head' in en.header).toBe(true);
    expect('button' in en.header).toBe(true);
  });

  it('should have the expected job translation keys', () => {
    expect('name' in en.job).toBe(true);
    expect('code' in en.job).toBe(true);
    expect('initSalary' in en.job).toBe(true);
    expect('maxSalary' in en.job).toBe(true);
  });

  it('should have the expected pages translation keys', () => {
    expect('createJob' in en.pages).toBe(true);
    expect('updateJob' in en.pages).toBe(true);
    expect('createBtn' in en.pages).toBe(true);
    expect('updateBtn' in en.pages).toBe(true);
  });

  it('should have the expected jobCategory translation keys', () => { 
    expect('new' in en.jobCategory).toBe(true);
    expect('shortlisted' in en.jobCategory).toBe(true);
    expect('interviewed' in en.jobCategory).toBe(true);
    expect('info' in en.jobCategory).toBe(true);
  });

  it('should have the expected notifications translation keys', () => {
    expect('success' in en.notifications).toBe(true);
    expect('invalid' in en.notifications).toBe(true);
    expect('jobAdded' in en.notifications).toBe(true);
    expect('jobUpdated' in en.notifications).toBe(true);
    expect('required' in en.notifications).toBe(true);
  });
  });
