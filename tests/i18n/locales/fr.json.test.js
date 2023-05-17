import fr from "@/i18n/locales/fr.json";
import { describe, it, expect } from 'vitest';

describe('fr.json', () => {
  it('should have the expected locale translation keys', () => {
    expect('en' in fr.locale).toBe(true);
    expect('fr' in fr.locale).toBe(true);
  });

  it('should have the expected jobs translation keys', () => {
    expect('search' in fr.jobs).toBe(true);
  });

  it('should have the expected nav translation keys', () => {
    expect('home' in fr.nav).toBe(true);
    expect('jobApplicant' in fr.nav).toBe(true);
    expect('new' in fr.nav).toBe(true);
    expect('smNew' in fr.nav).toBe(true);
    expect('update' in fr.nav).toBe(true);
    expect('delete' in fr.nav).toBe(true);
    expect('menu' in fr.nav).toBe(true);
    expect('info' in fr.nav).toBe(true);
  });

  it('should have the expected header translation keys', () => { 
    expect('head' in fr.header).toBe(true);
    expect('button' in fr.header).toBe(true);
  });

  it('should have the expected job translation keys', () => {
    expect('name' in fr.job).toBe(true);
    expect('code' in fr.job).toBe(true);
    expect('initSalary' in fr.job).toBe(true);
    expect('maxSalary' in fr.job).toBe(true);
  });

  it('should have the expected pages translation keys', () => {
    expect('createJob' in fr.pages).toBe(true);
    expect('updateJob' in fr.pages).toBe(true);
    expect('createBtn' in fr.pages).toBe(true);
    expect('updateBtn' in fr.pages).toBe(true);
  });

  it('should have the expected jobCategory translation keys', () => { 
    expect('new' in fr.jobCategory).toBe(true);
    expect('shortlisted' in fr.jobCategory).toBe(true);
    expect('interviewed' in fr.jobCategory).toBe(true);
    expect('info' in fr.jobCategory).toBe(true);
  });

  it('should have the expected notifications translation keys', () => {
    expect('success' in fr.notifications).toBe(true);
    expect('invalid' in fr.notifications).toBe(true);
    expect('jobAdded' in fr.notifications).toBe(true);
    expect('jobUpdated' in fr.notifications).toBe(true);
    expect('required' in fr.notifications).toBe(true);
  });
  });
