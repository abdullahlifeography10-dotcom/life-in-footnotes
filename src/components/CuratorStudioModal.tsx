import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import {
  X,
  Upload,
  Plus,
  Trash2,
  Download,
  Copy,
  RotateCcw,
  Check,
  Star,
  MapPin,
  Calendar,
  BookOpen,
  Camera,
  Compass,
  FileText,
  User,
  SlidersHorizontal,
  Info,
  AlertTriangle
} from 'lucide-react';
import { PhotoFrame, TravelDestination, DiaryEntry } from '../types';

export const CuratorStudioModal: React.FC = () => {
  const {
    content,
    isStudioOpen,
    closeStudio,
    addPhoto,
    updatePhoto,
    deletePhoto,
    togglePhotoFeatured,
    addCategory,
    addDestination,
    deleteDestination,
    addDiaryEntry,
    deleteDiaryEntry,
    updateProfile,
    exportContentJSON,
    importContentJSON,
    resetToDefaults
  } = useContent();

  const [activeSubTab, setActiveSubTab] = useState<'photos' | 'travel' | 'diary' | 'profile' | 'export'>('photos');
  const [copied, setCopied] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // In-app deletion target state (replaces iframe-blocked window.confirm)
  const [pendingDelete, setPendingDelete] = useState<{
    type: 'photo' | 'destination' | 'diary' | 'reset';
    id?: string;
    title: string;
    thumbnail?: string;
    details?: string;
  } | null>(null);

  // In-app caption editor state (replaces iframe-blocked window.prompt)
  const [editingCaptionPhoto, setEditingCaptionPhoto] = useState<{
    id: string;
    title: string;
    caption: string;
  } | null>(null);

  // New Photo Form State
  const [photoForm, setPhotoForm] = useState({
    title: '',
    category: 'Nature',
    newCategoryInput: '',
    imageUrl: '',
    caption: '',
    location: 'Rajshahi, Bangladesh',
    date: 'November 2026',
    cameraInfo: '35mm f/2 · ISO 200 · 1/500s',
    aspect: 'landscape' as 'landscape' | 'portrait' | 'square' | 'panoramic',
    featuredOnHome: true
  });

  // New Destination Form State
  const [destForm, setDestForm] = useState({
    title: '',
    location: '',
    country: 'Bangladesh',
    lat: '24.3745',
    lng: '88.6042',
    travelDate: '2026',
    coverImage: '',
    summary: '',
    experienceText: '',
    travelNotesText: '',
    closingThought: '',
    status: 'Visited' as 'Visited' | 'Upcoming' | 'Wishlist',
    featuredOnHome: true
  });

  // New Diary Form State
  const [diaryForm, setDiaryForm] = useState({
    title: '',
    category: 'Reflections',
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    readTime: '4 min read',
    coverImage: '',
    excerpt: '',
    paragraphsText: '',
    closingQuote: '',
    featuredOnHome: true
  });

  // Profile Form State
  const [profileForm, setProfileForm] = useState(content.profile);

  if (!isStudioOpen) return null;

  const showStatus = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const showError = (msg: string) => {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(null), 4500);
  };

  // Safe deletion executor (called only after user confirms via in-app dialog)
  const handleConfirmDelete = () => {
    if (!pendingDelete) return;
    try {
      if (pendingDelete.type === 'photo' && pendingDelete.id) {
        deletePhoto(pendingDelete.id);
        showStatus(`Photograph frame "${pendingDelete.title}" deleted successfully.`);
      } else if (pendingDelete.type === 'destination' && pendingDelete.id) {
        deleteDestination(pendingDelete.id);
        showStatus(`Travel story "${pendingDelete.title}" removed.`);
      } else if (pendingDelete.type === 'diary' && pendingDelete.id) {
        deleteDiaryEntry(pendingDelete.id);
        showStatus(`Diary entry "${pendingDelete.title}" removed.`);
      } else if (pendingDelete.type === 'reset') {
        resetToDefaults();
        showStatus('All portfolio content reset to defaults.');
      }
      setPendingDelete(null);
    } catch (err) {
      console.error('Delete action failed', err);
      showError('Failed to complete delete action. Please try again.');
    }
  };

  // Image file upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'photo' | 'dest' | 'diary') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const result = loadEvent.target?.result as string;
        if (target === 'photo') setPhotoForm((prev) => ({ ...prev, imageUrl: result }));
        if (target === 'dest') setDestForm((prev) => ({ ...prev, coverImage: result }));
        if (target === 'diary') setDiaryForm((prev) => ({ ...prev, coverImage: result }));
        showStatus('Image selected and converted successfully.');
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit Photo
  const handleAddPhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoForm.title.trim() || !photoForm.imageUrl.trim()) {
      showError('Please provide a photograph title and image source.');
      return;
    }

    const finalCategory = photoForm.newCategoryInput.trim()
      ? photoForm.newCategoryInput.trim()
      : photoForm.category;

    if (photoForm.newCategoryInput.trim()) {
      addCategory(photoForm.newCategoryInput.trim());
    }

    addPhoto({
      title: photoForm.title,
      category: finalCategory,
      imageUrl: photoForm.imageUrl,
      caption: photoForm.caption || photoForm.title,
      location: photoForm.location,
      date: photoForm.date,
      cameraInfo: photoForm.cameraInfo,
      aspect: photoForm.aspect,
      featuredOnHome: photoForm.featuredOnHome
    });

    setPhotoForm({
      title: '',
      category: finalCategory,
      newCategoryInput: '',
      imageUrl: '',
      caption: '',
      location: 'Rajshahi, Bangladesh',
      date: 'November 2026',
      cameraInfo: '35mm f/2 · ISO 200 · 1/500s',
      aspect: 'landscape',
      featuredOnHome: true
    });

    showStatus('Photograph added to portfolio!');
  };

  // Submit Travel Destination
  const handleAddDestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destForm.title.trim() || !destForm.coverImage.trim()) {
      showError('Please provide a destination title and cover image.');
      return;
    }

    const experienceParagraphs = destForm.experienceText
      .split('\n\n')
      .map((p) => p.trim())
      .filter(Boolean);

    const notesList = destForm.travelNotesText
      .split('\n')
      .map((n) => n.trim().replace(/^[-•*]\s*/, ''))
      .filter(Boolean);

    addDestination({
      title: destForm.title,
      location: destForm.location || destForm.title,
      country: destForm.country,
      coordinates: {
        lat: parseFloat(destForm.lat) || 24.3745,
        lng: parseFloat(destForm.lng) || 88.6042
      },
      travelDate: destForm.travelDate,
      coverImage: destForm.coverImage,
      summary: destForm.summary,
      personalExperience: experienceParagraphs.length > 0 ? experienceParagraphs : [destForm.summary],
      photoGallery: [
        { url: destForm.coverImage, caption: `${destForm.title} cover scene` }
      ],
      travelNotes: notesList.length > 0 ? notesList : ['Explore during early morning golden hours.'],
      closingThought: destForm.closingThought || 'A moment etched permanently into my footsteps.',
      status: destForm.status,
      featuredOnHome: destForm.featuredOnHome
    });

    setDestForm({
      title: '',
      location: '',
      country: 'Bangladesh',
      lat: '24.3745',
      lng: '88.6042',
      travelDate: '2026',
      coverImage: '',
      summary: '',
      experienceText: '',
      travelNotesText: '',
      closingThought: '',
      status: 'Visited',
      featuredOnHome: true
    });

    showStatus('Travel story published!');
  };

  // Submit Diary Entry
  const handleAddDiarySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!diaryForm.title.trim() || !diaryForm.excerpt.trim()) {
      showError('Please provide a diary essay title and excerpt.');
      return;
    }

    const paragraphs = diaryForm.paragraphsText
      .split('\n\n')
      .map((p) => p.trim())
      .filter(Boolean);

    addDiaryEntry({
      title: diaryForm.title,
      category: diaryForm.category,
      date: diaryForm.date,
      readTime: diaryForm.readTime,
      coverImage: diaryForm.coverImage || undefined,
      excerpt: diaryForm.excerpt,
      paragraphs: paragraphs.length > 0 ? paragraphs : [diaryForm.excerpt],
      closingQuote: diaryForm.closingQuote || undefined,
      featuredOnHome: diaryForm.featuredOnHome
    });

    setDiaryForm({
      title: '',
      category: 'Reflections',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: '4 min read',
      coverImage: '',
      excerpt: '',
      paragraphsText: '',
      closingQuote: '',
      featuredOnHome: true
    });

    showStatus('Diary entry published to Notes & Thoughts!');
  };

  // Handle Profile Update
  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileForm);
    showStatus('Brand profile and bio updated!');
  };

  // Copy JSON
  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(content, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showStatus('Content JSON copied to clipboard!');
  };

  // Handle Import JSON file
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        const success = importContentJSON(text);
        if (success) {
          showStatus('Imported content successfully!');
        } else {
          showError('Invalid content JSON file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#071A12]/85 backdrop-blur-md flex items-center justify-center p-3 md:p-6 overflow-y-auto"
    >
      <div className="bg-[#071A12] border border-[#344A3B] w-full max-w-5xl rounded-sm shadow-2xl flex flex-col max-h-[90vh] overflow-hidden text-[#F1EBDD]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#344A3B] flex items-center justify-between bg-[#10291D]">
          <div className="flex items-center gap-3">
            <SlidersHorizontal className="w-5 h-5 text-[#A9A77A]" />
            <div>
              <h2 className="font-editorial text-xl md:text-2xl text-[#F1EBDD] font-normal">
                Curator Studio
              </h2>
              <p className="text-xs text-[#B7BDAF] font-tech">
                Content Management System for Life in Footnotes
              </p>
            </div>
          </div>
          <button
            onClick={closeStudio}
            className="p-1.5 text-[#B7BDAF] hover:text-[#F1EBDD] transition-colors rounded-full hover:bg-white/5 cursor-pointer"
            aria-label="Close Studio"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Status & Error notification toasts */}
        {statusMessage && (
          <div className="bg-[#183526] text-[#F1EBDD] text-xs px-6 py-2.5 border-b border-[#344A3B] flex items-center gap-2 font-tech">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}
        {errorMessage && (
          <div className="bg-rose-950/80 text-rose-200 text-xs px-6 py-2.5 border-b border-rose-800/50 flex items-center gap-2 font-tech animate-in fade-in">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Sub-tab navigation */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-[#344A3B] bg-[#10291D] overflow-x-auto text-xs font-tech">
          <button
            onClick={() => setActiveSubTab('photos')}
            className={`px-4 py-2.5 border-b-2 font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeSubTab === 'photos'
                ? 'border-[#A9A77A] text-[#F1EBDD] bg-[#183526]'
                : 'border-transparent text-[#B7BDAF] hover:text-[#F1EBDD]'
            }`}
          >
            <Camera className="w-3.5 h-3.5 text-[#A9A77A]" />
            <span>Frames ({content.photos.length})</span>
          </button>
          <button
            onClick={() => setActiveSubTab('travel')}
            className={`px-4 py-2.5 border-b-2 font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeSubTab === 'travel'
                ? 'border-[#A9A77A] text-[#F1EBDD] bg-[#183526]'
                : 'border-transparent text-[#B7BDAF] hover:text-[#F1EBDD]'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-[#A9A77A]" />
            <span>Travel ({content.destinations.length})</span>
          </button>
          <button
            onClick={() => setActiveSubTab('diary')}
            className={`px-4 py-2.5 border-b-2 font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeSubTab === 'diary'
                ? 'border-[#A9A77A] text-[#F1EBDD] bg-[#183526]'
                : 'border-transparent text-[#B7BDAF] hover:text-[#F1EBDD]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#A9A77A]" />
            <span>Diary ({content.diaryEntries.length})</span>
          </button>
          <button
            onClick={() => setActiveSubTab('profile')}
            className={`px-4 py-2.5 border-b-2 font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeSubTab === 'profile'
                ? 'border-[#A9A77A] text-[#F1EBDD] bg-[#183526]'
                : 'border-transparent text-[#B7BDAF] hover:text-[#F1EBDD]'
            }`}
          >
            <User className="w-3.5 h-3.5 text-[#A9A77A]" />
            <span>Profile & Bio</span>
          </button>
          <button
            onClick={() => setActiveSubTab('export')}
            className={`px-4 py-2.5 border-b-2 font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeSubTab === 'export'
                ? 'border-[#A9A77A] text-[#F1EBDD] bg-[#183526]'
                : 'border-transparent text-[#B7BDAF] hover:text-[#F1EBDD]'
            }`}
          >
            <Download className="w-3.5 h-3.5 text-[#A9A77A]" />
            <span>Export & Guide</span>
          </button>
        </div>

        {/* Modal Body Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* TAB 1: PHOTOGRAPHS */}
          {activeSubTab === 'photos' && (
            <div className="space-y-8">
              {/* Add New Frame Box */}
              <div className="bg-[#183526]/60 border border-[#344A3B] p-6 rounded-sm">
                <h3 className="font-editorial text-xl text-[#F1EBDD] mb-4 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-[#A9A77A]" />
                  <span>Add New Photograph to Portfolio</span>
                </h3>

                <form onSubmit={handleAddPhotoSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-tech text-[#A9A77A] mb-1">
                        Photograph Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dawn Mist over Padma"
                        value={photoForm.title}
                        onChange={(e) => setPhotoForm({ ...photoForm, title: e.target.value })}
                        className="w-full bg-[#10291D] border border-[#344A3B] text-sm text-[#F1EBDD] px-3 py-2 rounded-sm focus:outline-none focus:border-[#A9A77A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-tech text-[#A9A77A] mb-1">
                        Category
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={photoForm.category}
                          onChange={(e) => setPhotoForm({ ...photoForm, category: e.target.value })}
                          className="flex-1 bg-[#10291D] border border-[#344A3B] text-sm text-[#F1EBDD] px-3 py-2 rounded-sm focus:outline-none focus:border-[#A9A77A]"
                        >
                          {content.categories.filter((c) => c !== 'All Frames').map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                        <input
                          type="text"
                          placeholder="Or new category..."
                          value={photoForm.newCategoryInput}
                          onChange={(e) => setPhotoForm({ ...photoForm, newCategoryInput: e.target.value })}
                          className="flex-1 bg-[#10291D] border border-[#344A3B] text-sm text-[#F1EBDD] px-3 py-2 rounded-sm focus:outline-none focus:border-[#A9A77A]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Image source: File upload or URL */}
                  <div>
                    <label className="block text-xs font-tech text-[#A9A77A] mb-1">
                      Image Source * (Upload from Computer or Paste Image URL)
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                      <div className="md:col-span-8">
                        <input
                          type="text"
                          placeholder="https://... or /src/assets/images/... or local file"
                          value={photoForm.imageUrl}
                          onChange={(e) => setPhotoForm({ ...photoForm, imageUrl: e.target.value })}
                          className="w-full bg-[#10291D] border border-[#344A3B] text-sm text-[#F1EBDD] px-3 py-2 rounded-sm focus:outline-none focus:border-[#A9A77A]"
                        />
                      </div>
                      <div className="md:col-span-4">
                        <label className="flex items-center justify-center gap-2 px-3 py-2 bg-[#183526] hover:bg-[#224835] border border-[#344A3B] text-xs font-tech text-[#F1EBDD] rounded-sm cursor-pointer transition-colors">
                          <Upload className="w-3.5 h-3.5 text-[#A9A77A]" />
                          <span>Browse Device...</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, 'photo')}
                          />
                        </label>
                      </div>
                    </div>
                    {photoForm.imageUrl && (
                      <div className="mt-2 flex items-center gap-3 bg-[#10291D] p-2 rounded-sm border border-[#344A3B]">
                        <img
                          src={photoForm.imageUrl}
                          alt="Preview"
                          className="w-12 h-12 object-cover rounded-sm border border-[#344A3B]"
                        />
                        <span className="text-xs text-[#B7BDAF] truncate">
                          Preview loaded successfully
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Caption */}
                  <div>
                    <label className="block text-xs font-tech text-[#A9A77A] mb-1">
                      Poetic Caption / Narrative Note
                    </label>
                    <textarea
                      rows={2}
                      placeholder="The story or feeling behind this photograph..."
                      value={photoForm.caption}
                      onChange={(e) => setPhotoForm({ ...photoForm, caption: e.target.value })}
                      className="w-full bg-[#10291D] border border-[#344A3B] text-sm text-[#F1EBDD] px-3 py-2 rounded-sm focus:outline-none focus:border-[#A9A77A]"
                    />
                  </div>

                  {/* Metadata Row: Location, Date, Camera info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-tech text-[#A9A77A] mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        placeholder="Rajshahi, Bangladesh"
                        value={photoForm.location}
                        onChange={(e) => setPhotoForm({ ...photoForm, location: e.target.value })}
                        className="w-full bg-[#10291D] border border-[#344A3B] text-sm text-[#F1EBDD] px-3 py-2 rounded-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-tech text-[#A9A77A] mb-1">
                        Date / Season
                      </label>
                      <input
                        type="text"
                        placeholder="Autumn 2026"
                        value={photoForm.date}
                        onChange={(e) => setPhotoForm({ ...photoForm, date: e.target.value })}
                        className="w-full bg-[#10291D] border border-[#344A3B] text-sm text-[#F1EBDD] px-3 py-2 rounded-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-tech text-[#A9A77A] mb-1">
                        Camera & Lens / EXIF
                      </label>
                      <input
                        type="text"
                        placeholder="Leica M6 · 35mm f/2 · Portra 400"
                        value={photoForm.cameraInfo}
                        onChange={(e) => setPhotoForm({ ...photoForm, cameraInfo: e.target.value })}
                        className="w-full bg-[#10291D] border border-[#344A3B] text-sm text-[#F1EBDD] px-3 py-2 rounded-sm"
                      />
                    </div>
                  </div>

                  {/* Orientation & Featured Toggle */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <div className="flex items-center gap-4 text-xs font-tech">
                      <span className="text-[#A9A77A]">Aspect Ratio:</span>
                      {(['landscape', 'portrait', 'square', 'panoramic'] as const).map((asp) => (
                        <label key={asp} className="flex items-center gap-1.5 cursor-pointer capitalize">
                          <input
                            type="radio"
                            name="aspect"
                            value={asp}
                            checked={photoForm.aspect === asp}
                            onChange={() => setPhotoForm({ ...photoForm, aspect: asp })}
                            className="text-[#A9A77A]"
                          />
                          <span>{asp}</span>
                        </label>
                      ))}
                    </div>

                    <label className="flex items-center gap-2 text-xs font-tech cursor-pointer">
                      <input
                        type="checkbox"
                        checked={photoForm.featuredOnHome}
                        onChange={(e) => setPhotoForm({ ...photoForm, featuredOnHome: e.target.checked })}
                      />
                      <span>Feature on Homepage Latest Frames</span>
                    </label>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#A9A77A] hover:bg-[#b8b688] text-[#071A12] font-semibold text-xs tracking-wider uppercase rounded-sm transition-colors cursor-pointer"
                    >
                      Publish Frame to Portfolio
                    </button>
                  </div>
                </form>
              </div>

              {/* Notice on Sample Content */}
              <div className="bg-[#10291D] border border-[#344A3B] p-4 rounded-sm text-xs font-tech text-[#B7BDAF] leading-relaxed flex items-start gap-3">
                <Info className="w-4 h-4 shrink-0 text-[#A9A77A] mt-0.5" />
                <div>
                  <strong className="text-[#F1EBDD]">Curator Note on Personal Work:</strong> All photographs, captions, and journal entries are 100% editable and replaceable. Upload your own camera shots, write your own footnotes, or delete any sample items at any time. Your changes persist immediately in your browser.
                </div>
              </div>

              {/* Current Photos List */}
              <div>
                <h3 className="font-editorial text-xl text-[#F1EBDD] mb-4">
                  Currently Published Frames ({content.photos.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {content.photos.map((photo) => (
                    <div
                      key={photo.id}
                      className="flex gap-4 p-3 bg-[#183526] border border-[#344A3B] rounded-sm items-center justify-between"
                    >
                      <img
                        src={photo.imageUrl}
                        alt={photo.title}
                        className="w-16 h-16 object-cover rounded-sm border border-[#344A3B] shrink-0"
                      />
                      <div className="flex-1 min-w-0 px-2">
                        <div className="font-editorial text-base text-[#F1EBDD] truncate">
                          {photo.title}
                        </div>
                        <div className="text-xs text-[#A9A77A] font-tech truncate">
                          {photo.category} · {photo.location}
                        </div>
                        <div className="text-xs text-[#B7BDAF] truncate font-light">
                          {photo.caption}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingCaptionPhoto({
                              id: photo.id,
                              title: photo.title,
                              caption: photo.caption
                            });
                          }}
                          className="px-2 py-1 text-[11px] font-tech text-[#A9A77A] hover:text-[#F1EBDD] hover:bg-white/5 border border-[#344A3B] rounded-xs transition-colors cursor-pointer"
                          title="Edit Caption"
                          aria-label={`Edit caption for ${photo.title}`}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => togglePhotoFeatured(photo.id)}
                          className={`p-1.5 rounded-sm transition-colors cursor-pointer ${
                            photo.featuredOnHome
                              ? 'text-[#A9A77A] bg-[#A9A77A]/15'
                              : 'text-[#B7BDAF] hover:text-[#F1EBDD]'
                          }`}
                          title={photo.featuredOnHome ? 'Featured on Home' : 'Not on Home'}
                          aria-label={photo.featuredOnHome ? 'Unfeature from home' : 'Feature on home'}
                        >
                          <Star className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setPendingDelete({
                              type: 'photo',
                              id: photo.id,
                              title: photo.title,
                              thumbnail: photo.imageUrl,
                              details: `${photo.category} · ${photo.location}`
                            });
                          }}
                          className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-sm transition-colors cursor-pointer"
                          title="Delete frame"
                          aria-label={`Delete frame ${photo.title}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TRAVEL DESTINATIONS */}
          {activeSubTab === 'travel' && (
            <div className="space-y-8">
              {/* Add Destination Form */}
              <div className="bg-[#183526]/60 border border-[#344A3B] p-6 rounded-sm">
                <h3 className="font-editorial text-xl text-[#F1EBDD] mb-4 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#A9A77A]" />
                  <span>Publish New Travel Story</span>
                </h3>

                <form onSubmit={handleAddDestSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-tech text-[#A9A77A] mb-1">
                        Destination Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sreemangal Tea Gardens"
                        value={destForm.title}
                        onChange={(e) => setDestForm({ ...destForm, title: e.target.value })}
                        className="w-full bg-[#10291D] border border-[#344A3B] text-sm text-[#F1EBDD] px-3 py-2 rounded-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-tech text-[#A9A77A] mb-1">
                        Region & Country
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Sylhet Division"
                          value={destForm.location}
                          onChange={(e) => setDestForm({ ...destForm, location: e.target.value })}
                          className="flex-1 bg-[#10291D] border border-[#344A3B] text-sm text-[#F1EBDD] px-3 py-2 rounded-sm"
                        />
                        <input
                          type="text"
                          placeholder="Bangladesh"
                          value={destForm.country}
                          onChange={(e) => setDestForm({ ...destForm, country: e.target.value })}
                          className="w-32 bg-[#10291D] border border-[#344A3B] text-sm text-[#F1EBDD] px-3 py-2 rounded-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Coordinates & Travel Date */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-tech text-[#A9A77A] mb-1">
                        Latitude
                      </label>
                      <input
                        type="text"
                        placeholder="24.3065"
                        value={destForm.lat}
                        onChange={(e) => setDestForm({ ...destForm, lat: e.target.value })}
                        className="w-full bg-[#10291D] border border-[#344A3B] text-sm text-[#F1EBDD] px-3 py-2 rounded-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-tech text-[#A9A77A] mb-1">
                        Longitude
                      </label>
                      <input
                        type="text"
                        placeholder="91.7296"
                        value={destForm.lng}
                        onChange={(e) => setDestForm({ ...destForm, lng: e.target.value })}
                        className="w-full bg-[#10291D] border border-[#344A3B] text-sm text-[#F1EBDD] px-3 py-2 rounded-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-tech text-[#A9A77A] mb-1">
                        Travel Season / Date
                      </label>
                      <input
                        type="text"
                        placeholder="Winter 2026"
                        value={destForm.travelDate}
                        onChange={(e) => setDestForm({ ...destForm, travelDate: e.target.value })}
                        className="w-full bg-[#10291D] border border-[#344A3B] text-sm text-[#F1EBDD] px-3 py-2 rounded-sm"
                      />
                    </div>
                  </div>

                  {/* Cover Image */}
                  <div>
                    <label className="block text-xs font-tech text-[#A9A77A] mb-1">
                      Cover Image *
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        placeholder="Image URL or upload..."
                        value={destForm.coverImage}
                        onChange={(e) => setDestForm({ ...destForm, coverImage: e.target.value })}
                        className="flex-1 bg-[#10291D] border border-[#344A3B] text-sm text-[#F1EBDD] px-3 py-2 rounded-sm"
                      />
                      <label className="px-3 py-2 bg-[#183526] hover:bg-[#224835] border border-[#344A3B] text-xs font-tech text-[#F1EBDD] rounded-sm cursor-pointer transition-colors flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5 text-[#A9A77A]" />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, 'dest')}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Summary */}
                  <div>
                    <label className="block text-xs font-tech text-[#A9A77A] mb-1">
                      One-Sentence Summary
                    </label>
                    <input
                      type="text"
                      placeholder="A solitary coral outpost where the ocean turns turquoise..."
                      value={destForm.summary}
                      onChange={(e) => setDestForm({ ...destForm, summary: e.target.value })}
                      className="w-full bg-[#10291D] border border-[#344A3B] text-sm text-[#F1EBDD] px-3 py-2 rounded-sm"
                    />
                  </div>

                  {/* Personal Experience Paragraphs */}
                  <div>
                    <label className="block text-xs font-tech text-[#A9A77A] mb-1">
                      Personal Journal Essay (separate paragraphs with blank lines)
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Write your personal memories and observations here..."
                      value={destForm.experienceText}
                      onChange={(e) => setDestForm({ ...destForm, experienceText: e.target.value })}
                      className="w-full bg-[#10291D] border border-[#344A3B] text-sm text-[#F1EBDD] px-3 py-2 rounded-sm"
                    />
                  </div>

                  {/* Travel Notes & Closing thought */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-tech text-[#A9A77A] mb-1">
                        Field Notes & Tips (one per line)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Carry cash; electricity is generator-based&#10;Visit beach at 6:00 AM for soft morning light"
                        value={destForm.travelNotesText}
                        onChange={(e) => setDestForm({ ...destForm, travelNotesText: e.target.value })}
                        className="w-full bg-[#10291D] border border-[#344A3B] text-sm text-[#F1EBDD] px-3 py-2 rounded-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-tech text-[#A9A77A] mb-1">
                        Memorable Closing Thought
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Some places do not belong to maps; they belong to quiet moments..."
                        value={destForm.closingThought}
                        onChange={(e) => setDestForm({ ...destForm, closingThought: e.target.value })}
                        className="w-full bg-[#10291D] border border-[#344A3B] text-sm text-[#F1EBDD] px-3 py-2 rounded-sm"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#A9A77A] hover:bg-[#b8b688] text-[#071A12] font-semibold text-xs tracking-wider uppercase rounded-sm transition-colors cursor-pointer"
                    >
                      Publish Travel Destination
                    </button>
                  </div>
                </form>
              </div>

              {/* Destination list */}
              <div>
                <h3 className="font-editorial text-xl text-[#F1EBDD] mb-4">
                  Published Destinations ({content.destinations.length})
                </h3>
                <div className="space-y-3">
                  {content.destinations.map((dest) => (
                    <div
                      key={dest.id}
                      className="p-4 bg-[#183526] border border-[#344A3B] rounded-sm flex items-center justify-between gap-4"
                    >
                      <img
                        src={dest.coverImage}
                        alt={dest.title}
                        className="w-20 h-14 object-cover rounded-sm border border-[#344A3B] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-editorial text-lg text-[#F1EBDD]">{dest.title}</div>
                        <div className="text-xs text-[#A9A77A] font-tech">
                          {dest.location}, {dest.country} · {dest.travelDate}
                        </div>
                        <div className="text-xs text-[#B7BDAF] truncate mt-0.5 font-light">
                          {dest.summary}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setPendingDelete({
                            type: 'destination',
                            id: dest.id,
                            title: dest.title,
                            thumbnail: dest.coverImage,
                            details: `${dest.location}, ${dest.country} · ${dest.travelDate}`
                          });
                        }}
                        className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-sm transition-colors cursor-pointer shrink-0"
                        title="Delete destination"
                        aria-label={`Delete destination ${dest.title}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DIARY (NOTES & THOUGHTS) */}
          {activeSubTab === 'diary' && (
            <div className="space-y-8">
              {/* Add Diary Box */}
              <div className="bg-[#183526]/60 border border-[#344A3B] p-6 rounded-sm">
                <h3 className="font-editorial text-xl text-[#F1EBDD] mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#A9A77A]" />
                  <span>Write New Diary Essay</span>
                </h3>

                <form onSubmit={handleAddDiarySubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-tech text-[#A9A77A] mb-1">
                        Essay Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Somewhere Between Yesterday and Tomorrow"
                        value={diaryForm.title}
                        onChange={(e) => setDiaryForm({ ...diaryForm, title: e.target.value })}
                        className="w-full bg-[#10291D] border border-[#344A3B] text-sm text-[#F1EBDD] px-3 py-2 rounded-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-tech text-[#A9A77A] mb-1">
                        Category
                      </label>
                      <select
                        value={diaryForm.category}
                        onChange={(e) => setDiaryForm({ ...diaryForm, category: e.target.value })}
                        className="w-full bg-[#10291D] border border-[#344A3B] text-sm text-[#F1EBDD] px-3 py-2 rounded-sm"
                      >
                        <option value="Life Notes">Life Notes</option>
                        <option value="Reflections">Reflections</option>
                        <option value="Memories">Memories</option>
                        <option value="Random Thoughts">Random Thoughts</option>
                        <option value="Letters to Time">Letters to Time</option>
                        <option value="Everyday Stories">Everyday Stories</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-tech text-[#A9A77A] mb-1">
                        Publication Date
                      </label>
                      <input
                        type="text"
                        value={diaryForm.date}
                        onChange={(e) => setDiaryForm({ ...diaryForm, date: e.target.value })}
                        className="w-full bg-[#10291D] border border-[#344A3B] text-sm text-[#F1EBDD] px-3 py-2 rounded-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-tech text-[#A9A77A] mb-1">
                        Read Time
                      </label>
                      <input
                        type="text"
                        value={diaryForm.readTime}
                        onChange={(e) => setDiaryForm({ ...diaryForm, readTime: e.target.value })}
                        className="w-full bg-[#10291D] border border-[#344A3B] text-sm text-[#F1EBDD] px-3 py-2 rounded-sm"
                      />
                    </div>
                  </div>

                  {/* Excerpt */}
                  <div>
                    <label className="block text-xs font-tech text-[#A9A77A] mb-1">
                      Kicker Excerpt (2-3 sentences)
                    </label>
                    <textarea
                      rows={2}
                      required
                      placeholder="A short contemplative introduction to hook the reader..."
                      value={diaryForm.excerpt}
                      onChange={(e) => setDiaryForm({ ...diaryForm, excerpt: e.target.value })}
                      className="w-full bg-[#10291D] border border-[#344A3B] text-sm text-[#F1EBDD] px-3 py-2 rounded-sm"
                    />
                  </div>

                  {/* Paragraphs */}
                  <div>
                    <label className="block text-xs font-tech text-[#A9A77A] mb-1">
                      Full Essay Text (separate paragraphs with blank lines)
                    </label>
                    <textarea
                      rows={6}
                      placeholder="Pour your reflections, memories, and philosophical musings here..."
                      value={diaryForm.paragraphsText}
                      onChange={(e) => setDiaryForm({ ...diaryForm, paragraphsText: e.target.value })}
                      className="w-full bg-[#10291D] border border-[#344A3B] text-sm text-[#F1EBDD] px-3 py-2 rounded-sm font-sans"
                    />
                  </div>

                  {/* Closing Quote */}
                  <div>
                    <label className="block text-xs font-tech text-[#A9A77A] mb-1">
                      Memorable Closing Epilogue Quote
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Life is written in the main text, but it is felt in the footnotes."
                      value={diaryForm.closingQuote}
                      onChange={(e) => setDiaryForm({ ...diaryForm, closingQuote: e.target.value })}
                      className="w-full bg-[#10291D] border border-[#344A3B] text-sm text-[#F1EBDD] px-3 py-2 rounded-sm"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#A9A77A] hover:bg-[#b8b688] text-[#071A12] font-semibold text-xs tracking-wider uppercase rounded-sm transition-colors cursor-pointer"
                    >
                      Publish to Notes & Thoughts
                    </button>
                  </div>
                </form>
              </div>

              {/* Existing Diary list */}
              <div>
                <h3 className="font-editorial text-xl text-[#F1EBDD] mb-4">
                  Published Entries ({content.diaryEntries.length})
                </h3>
                <div className="space-y-3">
                  {content.diaryEntries.map((entry) => (
                    <div
                      key={entry.id}
                      className="p-4 bg-[#183526] border border-[#344A3B] rounded-sm flex items-center justify-between gap-4"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-editorial text-lg text-[#F1EBDD]">{entry.title}</div>
                        <div className="text-xs text-[#A9A77A] font-tech">
                          {entry.category} · {entry.date} · {entry.readTime}
                        </div>
                        <div className="text-xs text-[#B7BDAF] truncate mt-0.5 font-light">
                          {entry.excerpt}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setPendingDelete({
                            type: 'diary',
                            id: entry.id,
                            title: entry.title,
                            thumbnail: entry.coverImage,
                            details: `${entry.category} · ${entry.readTime} · ${entry.date}`
                          });
                        }}
                        className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-sm transition-colors cursor-pointer shrink-0"
                        title="Delete diary entry"
                        aria-label={`Delete diary entry ${entry.title}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PROFILE & BIO */}
          {activeSubTab === 'profile' && (
            <div className="space-y-6">
              <form onSubmit={handleProfileSave} className="bg-[#183526]/60 border border-[#344A3B] p-6 rounded-sm space-y-4">
                <h3 className="font-editorial text-xl text-[#F1EBDD] mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#A9A77A]" />
                  <span>Edit Creator & Brand Information</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-tech text-[#A9A77A] mb-1">
                      Brand Name
                    </label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full bg-[#10291D] border border-[#344A3B] text-sm text-[#F1EBDD] px-3 py-2 rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-tech text-[#A9A77A] mb-1">
                      Tagline
                    </label>
                    <input
                      type="text"
                      value={profileForm.tagline}
                      onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                      className="w-full bg-[#10291D] border border-[#344A3B] text-sm text-[#F1EBDD] px-3 py-2 rounded-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-tech text-[#A9A77A] mb-1">
                      Creator Name
                    </label>
                    <input
                      type="text"
                      value={profileForm.creator}
                      onChange={(e) => setProfileForm({ ...profileForm, creator: e.target.value })}
                      className="w-full bg-[#10291D] border border-[#344A3B] text-sm text-[#F1EBDD] px-3 py-2 rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-tech text-[#A9A77A] mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={profileForm.location}
                      onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                      className="w-full bg-[#10291D] border border-[#344A3B] text-sm text-[#F1EBDD] px-3 py-2 rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-tech text-[#A9A77A] mb-1">
                      Instagram Handle
                    </label>
                    <input
                      type="text"
                      value={profileForm.instagram}
                      onChange={(e) => setProfileForm({ ...profileForm, instagram: e.target.value })}
                      className="w-full bg-[#10291D] border border-[#344A3B] text-sm text-[#F1EBDD] px-3 py-2 rounded-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-tech text-[#A9A77A] mb-1">
                    Homepage Supporting Hero Text
                  </label>
                  <input
                    type="text"
                    value={profileForm.heroSupportingText}
                    onChange={(e) => setProfileForm({ ...profileForm, heroSupportingText: e.target.value })}
                    className="w-full bg-[#10291D] border border-[#344A3B] text-sm text-[#F1EBDD] px-3 py-2 rounded-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-tech text-[#A9A77A] mb-1">
                    Brand Description
                  </label>
                  <textarea
                    rows={2}
                    value={profileForm.description}
                    onChange={(e) => setProfileForm({ ...profileForm, description: e.target.value })}
                    className="w-full bg-[#10291D] border border-[#344A3B] text-sm text-[#F1EBDD] px-3 py-2 rounded-sm"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#A9A77A] hover:bg-[#b8b688] text-[#071A12] font-semibold text-xs tracking-wider uppercase rounded-sm transition-colors cursor-pointer"
                  >
                    Save Profile Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 5: EXPORT & DEPLOYMENT GUIDE */}
          {activeSubTab === 'export' && (
            <div className="space-y-8">
              {/* Plain English Guide */}
              <div className="bg-[#10291D] border border-[#344A3B] p-6 rounded-sm space-y-4">
                <div className="flex items-center gap-2 text-[#A9A77A]">
                  <Info className="w-5 h-5 shrink-0" />
                  <h3 className="font-editorial text-2xl text-[#F1EBDD] font-normal">
                    How Content Management Works
                  </h3>
                </div>
                <div className="space-y-3 text-sm text-[#B7BDAF] leading-relaxed font-light">
                  <p>
                    As a university student and creator, you do not need to pay monthly server subscriptions or learn complex database code.
                  </p>
                  <div className="space-y-2 pl-4 border-l-2 border-[#A9A77A] text-xs font-tech">
                    <div>
                      <strong className="text-[#F1EBDD]">1. Instant Live Edits:</strong> Any photograph, caption, travel note, or diary thought you edit or add here is saved instantly to your browser storage (LocalStorage).
                    </div>
                    <div>
                      <strong className="text-[#F1EBDD]">2. Permanent Deployment:</strong> Click <strong className="text-[#F1EBDD]">Download content.json</strong> below. You can save or replace this file in your project or repository.
                    </div>
                    <div>
                      <strong className="text-[#F1EBDD]">3. 100% Free Hosting:</strong> When you connect your project to GitHub and Vercel or Netlify, your website builds automatically for $0/month.
                    </div>
                    <div>
                      <strong className="text-[#F1EBDD]">4. Honest Note on Backend:</strong> This app runs client-side without an expensive SQL database server. If you ever want a multi-user administrative login with password authentication in the future, you can connect Firebase Authentication and Firestore for free.
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <button
                    onClick={exportContentJSON}
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#A9A77A] hover:bg-[#b8b688] text-[#071A12] font-semibold text-xs tracking-wider uppercase rounded-sm transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download content.json</span>
                  </button>

                  <button
                    onClick={handleCopyJSON}
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#183526] hover:bg-[#224835] border border-[#344A3B] text-[#F1EBDD] text-xs font-tech rounded-sm transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied to Clipboard!' : 'Copy JSON'}</span>
                  </button>

                  <label className="flex items-center gap-2 px-4 py-2.5 bg-[#10291D] hover:bg-[#183526] border border-[#344A3B] text-[#B7BDAF] hover:text-[#F1EBDD] text-xs font-tech rounded-sm transition-colors cursor-pointer">
                    <Upload className="w-4 h-4" />
                    <span>Import JSON Backup...</span>
                    <input
                      type="file"
                      accept=".json"
                      className="hidden"
                      onChange={handleImportFile}
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      setPendingDelete({
                        type: 'reset',
                        title: 'Reset All Portfolio Content to Defaults',
                        details: 'This will restore all original sample photographs, travel logs, and diary essays.'
                      });
                    }}
                    className="flex items-center gap-1.5 px-4 py-2.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 border border-rose-900/40 rounded-sm transition-colors cursor-pointer ml-auto font-tech"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset to Defaults</span>
                  </button>
                </div>
              </div>

              {/* Step-by-step GitHub & Vercel tutorial */}
              <div className="p-6 bg-[#183526]/50 border border-[#344A3B] rounded-sm space-y-4">
                <h4 className="font-editorial text-xl text-[#F1EBDD]">
                  Quick 3-Minute Deployment to GitHub & Vercel
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-xs text-[#B7BDAF] leading-relaxed">
                  <li>Push this repository to your personal <span className="text-[#F1EBDD]">GitHub</span> account.</li>
                  <li>Log in to <span className="text-[#F1EBDD]">vercel.com</span> (free forever tier) and click "Import Project".</li>
                  <li>Select your repository and click "Deploy" — your portfolio will be live at a custom URL (e.g. <code className="text-[#A9A77A]">life-in-footnotes.vercel.app</code>).</li>
                  <li>To update photos or stories at any time: either use this Curator Studio or replace the JSON file in your repo!</li>
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* IN-APP CONFIRMATION MODAL FOR DELETIONS */}
        {pendingDelete && (
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-dialog-title"
            className="fixed inset-0 z-[70] bg-[#071A12]/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
          >
            <div className="bg-[#10291D] border border-rose-900/60 w-full max-w-md rounded-sm p-6 shadow-2xl space-y-5 animate-in zoom-in-95">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-rose-950/70 border border-rose-800/60 flex items-center justify-center shrink-0 text-rose-400">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 id="delete-dialog-title" className="font-editorial text-xl text-[#F1EBDD]">
                    {pendingDelete.type === 'photo' && 'Delete Photograph Frame'}
                    {pendingDelete.type === 'destination' && 'Delete Travel Story'}
                    {pendingDelete.type === 'diary' && 'Delete Diary Entry'}
                    {pendingDelete.type === 'reset' && 'Reset All Content'}
                  </h4>
                  <p className="text-xs text-[#B7BDAF] font-light mt-1 leading-relaxed">
                    {pendingDelete.type === 'photo' &&
                      'Are you sure you want to permanently delete this photograph frame? It will be removed immediately from your portfolio, homepage, and category galleries.'}
                    {pendingDelete.type === 'destination' &&
                      'Are you sure you want to delete this travel story from your journal and destinations list?'}
                    {pendingDelete.type === 'diary' &&
                      'Are you sure you want to delete this diary essay from Notes & Thoughts?'}
                    {pendingDelete.type === 'reset' &&
                      'This will clear all local changes and restore the pristine original portfolio and journal entries.'}
                  </p>
                </div>
              </div>

              {/* Item card preview */}
              <div className="bg-[#071A12] border border-[#344A3B] p-3.5 rounded-sm flex items-center gap-3">
                {pendingDelete.thumbnail ? (
                  <img
                    src={pendingDelete.thumbnail}
                    alt={pendingDelete.title}
                    className="w-14 h-14 object-cover rounded-xs border border-[#344A3B] shrink-0"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-xs bg-[#183526] border border-[#344A3B] flex items-center justify-center shrink-0 text-[#A9A77A]">
                    <AlertTriangle className="w-6 h-6 text-rose-400" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="font-editorial text-base text-[#F1EBDD] truncate">
                    {pendingDelete.title}
                  </div>
                  {pendingDelete.details && (
                    <div className="text-[11px] text-[#A9A77A] font-tech truncate mt-0.5">
                      {pendingDelete.details}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setPendingDelete(null)}
                  className="px-4 py-2 bg-[#183526] hover:bg-[#224835] border border-[#344A3B] text-xs font-tech text-[#F1EBDD] rounded-sm transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 bg-rose-700 hover:bg-rose-600 text-white font-tech font-semibold text-xs rounded-sm transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>
                    {pendingDelete.type === 'reset' ? 'Confirm Reset' : 'Confirm Delete'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* IN-APP CAPTION EDITING MODAL */}
        {editingCaptionPhoto && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-caption-title"
            className="fixed inset-0 z-[70] bg-[#071A12]/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
          >
            <div className="bg-[#10291D] border border-[#344A3B] w-full max-w-lg rounded-sm p-6 shadow-2xl space-y-4 animate-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 border-b border-[#344A3B]">
                <h4 id="edit-caption-title" className="font-editorial text-xl text-[#F1EBDD]">
                  Edit Caption: {editingCaptionPhoto.title}
                </h4>
                <button
                  type="button"
                  onClick={() => setEditingCaptionPhoto(null)}
                  className="text-[#B7BDAF] hover:text-[#F1EBDD] p-1 cursor-pointer"
                  aria-label="Close edit caption"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <label className="block text-xs font-tech text-[#A9A77A] mb-1.5">
                  Narrative Note / Poetic Caption
                </label>
                <textarea
                  rows={4}
                  value={editingCaptionPhoto.caption}
                  onChange={(e) =>
                    setEditingCaptionPhoto({ ...editingCaptionPhoto, caption: e.target.value })
                  }
                  className="w-full bg-[#071A12] border border-[#344A3B] text-sm text-[#F1EBDD] p-3 rounded-sm focus:outline-none focus:border-[#A9A77A]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingCaptionPhoto(null)}
                  className="px-4 py-2 bg-[#183526] hover:bg-[#224835] border border-[#344A3B] text-xs font-tech text-[#F1EBDD] rounded-sm transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    updatePhoto(editingCaptionPhoto.id, { caption: editingCaptionPhoto.caption });
                    showStatus('Caption updated successfully.');
                    setEditingCaptionPhoto(null);
                  }}
                  className="px-4 py-2 bg-[#A9A77A] hover:bg-[#b8b688] text-[#071A12] font-semibold text-xs font-tech rounded-sm transition-colors cursor-pointer"
                >
                  Save Caption
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
