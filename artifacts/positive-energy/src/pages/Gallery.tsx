import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { galleryPhotos, allTags } from '@/data/gallery';
import { useSearch } from 'wouter';
import { Camera, Tag, X } from 'lucide-react';

export default function Gallery() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const initialProject = params.get('project') ?? null;

  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<string | null>(initialProject);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  // Sync project filter from URL changes
  useEffect(() => {
    const p = new URLSearchParams(search).get('project');
    setActiveProject(p ?? null);
    setActiveTag(null);
  }, [search]);

  const filtered = galleryPhotos.filter((photo) => {
    if (activeProject && photo.project !== activeProject) return false;
    if (activeTag && !photo.tags.includes(activeTag)) return false;
    return true;
  });

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => new Set(prev).add(id));
  };

  const clearFilters = () => {
    setActiveTag(null);
    setActiveProject(null);
    // Update URL without navigation
    const url = new URL(window.location.href);
    url.searchParams.delete('project');
    window.history.replaceState({}, '', url.toString());
  };

  const hasFilter = activeTag !== null || activeProject !== null;

  return (
    <Layout>
      {/* Page head meta is handled via the title element below */}
      <title>EV Charging &amp; Solar Installation Gallery — Positive Energy, Nashville TN</title>

      {/* Header */}
      <section className="pt-24 pb-16 bg-card border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-start gap-4 mb-6">
            <Camera className="h-8 w-8 text-primary mt-1 shrink-0" />
            <div>
              <h1 className="text-5xl md:text-7xl font-bold uppercase font-heading">
                Gallery
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mt-4">
                Real job-site photos from commercial EV charging installs, dealership deployments, and infrastructure projects across the Southeast.
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {galleryPhotos.length} photos across {new Set(galleryPhotos.map((p) => p.project).filter(Boolean)).size} named projects
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-30 bg-background/95 backdrop-blur-md border-b border-border py-4">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="h-4 w-4 text-muted-foreground shrink-0" />
            <button
              onClick={clearFilters}
              className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 border transition-colors ${
                !hasFilter
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
              }`}
            >
              All ({galleryPhotos.length})
            </button>
            {allTags.map((tag) => {
              const count = galleryPhotos.filter((p) => p.tags.includes(tag)).length;
              const isActive = activeTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => {
                    setActiveProject(null);
                    setActiveTag(isActive ? null : tag);
                  }}
                  className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 border transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
                  }`}
                >
                  {tag} ({count})
                </button>
              );
            })}
            {hasFilter && (
              <button
                onClick={clearFilters}
                className="ml-auto flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <X className="h-3 w-3" />
                Clear filter
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Active Filter Banner */}
      {activeProject && (
        <div className="bg-primary/10 border-b border-primary/20 py-2">
          <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
            <span className="text-sm text-primary font-medium">
              Showing photos for project: <strong>{activeProject.replace(/-/g, ' ')}</strong>
            </span>
            <button onClick={clearFilters} className="text-xs text-primary hover:underline">
              Show all
            </button>
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No photos match the selected filter.</p>
              <button onClick={clearFilters} className="mt-4 text-primary hover:underline text-sm">
                Clear filter
              </button>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
              {filtered.map((photo) => (
                <div
                  key={photo.id}
                  className="break-inside-avoid bg-card border border-border group hover:border-primary/50 transition-colors duration-300"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden bg-background">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      onLoad={() => handleImageLoad(photo.id)}
                      className={`w-full h-auto object-cover transition-all duration-700 group-hover:scale-105 ${
                        loadedImages.has(photo.id) ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                    {!loadedImages.has(photo.id) && (
                      <div className="absolute inset-0 flex items-center justify-center min-h-[200px]"
                        style={{ background: 'linear-gradient(135deg, hsl(163 56% 15%) 0%, hsl(220 15% 18%) 100%)' }}>
                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                    {/* Year badge */}
                    <div className="absolute top-3 right-3">
                      <span className="bg-black/70 text-white text-xs font-bold px-2 py-1 backdrop-blur">
                        {photo.year}
                      </span>
                    </div>
                  </div>

                  {/* Caption & Tags */}
                  <div className="p-4">
                    <p className="text-sm font-bold text-foreground mb-2 leading-snug">
                      {photo.caption}
                    </p>
                    {photo.location && (
                      <p className="text-xs text-muted-foreground mb-3">{photo.location}</p>
                    )}
                    <div className="flex flex-wrap gap-1.5">
                      {photo.tags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => {
                            setActiveProject(null);
                            setActiveTag(activeTag === tag ? null : tag);
                          }}
                          className={`text-xs px-2 py-0.5 border transition-colors ${
                            activeTag === tag
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
