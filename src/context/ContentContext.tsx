import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent, PhotoFrame, TravelDestination, DiaryEntry, BrandProfile } from '../types';
import { DEFAULT_CONTENT } from '../data/defaultContent';

const STORAGE_KEY = 'life_in_footnotes_content_v1';
const THEME_KEY = 'life_in_footnotes_theme_v1';

interface ContentContextType {
  content: SiteContent;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  // Frame actions
  addPhoto: (photo: Omit<PhotoFrame, 'id'>) => void;
  updatePhoto: (id: string, photo: Partial<PhotoFrame>) => void;
  deletePhoto: (id: string) => void;
  togglePhotoFeatured: (id: string) => void;
  // Category actions
  addCategory: (category: string) => void;
  // Travel actions
  addDestination: (destination: Omit<TravelDestination, 'id'>) => void;
  updateDestination: (id: string, destination: Partial<TravelDestination>) => void;
  deleteDestination: (id: string) => void;
  // Diary actions
  addDiaryEntry: (entry: Omit<DiaryEntry, 'id' | 'slug'>) => void;
  updateDiaryEntry: (id: string, entry: Partial<DiaryEntry>) => void;
  deleteDiaryEntry: (id: string) => void;
  // Profile actions
  updateProfile: (profile: Partial<BrandProfile>) => void;
  // Backup & Reset
  exportContentJSON: () => void;
  importContentJSON: (jsonString: string) => boolean;
  resetToDefaults: () => void;
  // Curator studio modal state
  isStudioOpen: boolean;
  openStudio: () => void;
  closeStudio: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          parsed &&
          parsed.profile &&
          Array.isArray(parsed.photos) &&
          Array.isArray(parsed.destinations) &&
          Array.isArray(parsed.diaryEntries)
        ) {
          return {
            ...DEFAULT_CONTENT,
            ...parsed,
            profile: { ...DEFAULT_CONTENT.profile, ...parsed.profile },
            photos: parsed.photos,
            destinations: parsed.destinations,
            diaryEntries: parsed.diaryEntries,
            categories: Array.isArray(parsed.categories) && parsed.categories.length > 0
              ? parsed.categories
              : DEFAULT_CONTENT.categories
          };
        }
      }
    } catch (e) {
      console.warn('Failed to load saved content from localStorage', e);
    }
    return DEFAULT_CONTENT;
  });

  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isStudioOpen, setIsStudioOpen] = useState(false);

  // Initialize theme
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_KEY);
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setTheme(savedTheme);
      }
    } catch {
      // ignore
    }
  }, []);

  // Sync theme with HTML root class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  // Persist content to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [content]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const openStudio = () => setIsStudioOpen(true);
  const closeStudio = () => setIsStudioOpen(false);

  // Photos
  const addPhoto = (newPhotoData: Omit<PhotoFrame, 'id'>) => {
    const newPhoto: PhotoFrame = {
      ...newPhotoData,
      id: `frame-${Date.now()}`
    };
    setContent((prev) => ({
      ...prev,
      photos: [newPhoto, ...prev.photos]
    }));
  };

  const updatePhoto = (id: string, updated: Partial<PhotoFrame>) => {
    setContent((prev) => ({
      ...prev,
      photos: prev.photos.map((p) => (p.id === id ? { ...p, ...updated } : p))
    }));
  };

  const deletePhoto = (id: string) => {
    setContent((prev) => ({
      ...prev,
      photos: prev.photos.filter((p) => p.id !== id)
    }));
  };

  const togglePhotoFeatured = (id: string) => {
    setContent((prev) => ({
      ...prev,
      photos: prev.photos.map((p) =>
        p.id === id ? { ...p, featuredOnHome: !p.featuredOnHome } : p
      )
    }));
  };

  const addCategory = (category: string) => {
    if (!category.trim()) return;
    setContent((prev) => {
      if (prev.categories.includes(category.trim())) return prev;
      return {
        ...prev,
        categories: [...prev.categories, category.trim()]
      };
    });
  };

  // Travel
  const addDestination = (newDestData: Omit<TravelDestination, 'id'>) => {
    const newDest: TravelDestination = {
      ...newDestData,
      id: `dest-${Date.now()}`
    };
    setContent((prev) => ({
      ...prev,
      destinations: [newDest, ...prev.destinations]
    }));
  };

  const updateDestination = (id: string, updated: Partial<TravelDestination>) => {
    setContent((prev) => ({
      ...prev,
      destinations: prev.destinations.map((d) => (d.id === id ? { ...d, ...updated } : d))
    }));
  };

  const deleteDestination = (id: string) => {
    setContent((prev) => ({
      ...prev,
      destinations: prev.destinations.filter((d) => d.id !== id)
    }));
  };

  // Diary
  const addDiaryEntry = (newEntryData: Omit<DiaryEntry, 'id' | 'slug'>) => {
    const slug = newEntryData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    const newEntry: DiaryEntry = {
      ...newEntryData,
      id: `diary-${Date.now()}`,
      slug: slug || `entry-${Date.now()}`
    };
    setContent((prev) => ({
      ...prev,
      diaryEntries: [newEntry, ...prev.diaryEntries]
    }));
  };

  const updateDiaryEntry = (id: string, updated: Partial<DiaryEntry>) => {
    setContent((prev) => ({
      ...prev,
      diaryEntries: prev.diaryEntries.map((e) => (e.id === id ? { ...e, ...updated } : e))
    }));
  };

  const deleteDiaryEntry = (id: string) => {
    setContent((prev) => ({
      ...prev,
      diaryEntries: prev.diaryEntries.filter((e) => e.id !== id)
    }));
  };

  // Profile
  const updateProfile = (profileUpdate: Partial<BrandProfile>) => {
    setContent((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...profileUpdate }
    }));
  };

  // Export JSON
  const exportContentJSON = () => {
    const jsonStr = JSON.stringify(content, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `life-in-footnotes-content-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Import JSON
  const importContentJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.profile && Array.isArray(parsed.photos) && Array.isArray(parsed.destinations)) {
        setContent(parsed);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const resetToDefaults = () => {
    setContent(DEFAULT_CONTENT);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        theme,
        toggleTheme,
        addPhoto,
        updatePhoto,
        deletePhoto,
        togglePhotoFeatured,
        addCategory,
        addDestination,
        updateDestination,
        deleteDestination,
        addDiaryEntry,
        updateDiaryEntry,
        deleteDiaryEntry,
        updateProfile,
        exportContentJSON,
        importContentJSON,
        resetToDefaults,
        isStudioOpen,
        openStudio,
        closeStudio
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
