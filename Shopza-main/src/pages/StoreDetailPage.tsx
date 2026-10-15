import React, { useState } from 'react';
import {
  ShieldCheck,
  UserPlus,
  UserCheck,
  MessageSquare,
  Share2,
  Clock,
  MapPin,
  Truck,
  RotateCcw,
  Search,
  Star,
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { StarRating } from '../components/marketplace/StarRating';
import { ProductCard } from '../components/marketplace/ProductCard';
import { StorefrontChatModal } from '../components/marketplace/StorefrontChatModal';
import { StoreReviewModal } from '../components/marketplace/StoreReviewModal';

export const StoreDetailPage: React.FC<{ username: string }> = ({ username }) => {
  const {
    getStoreByUsername,
    stores,
    products,
    services,
    reviews,
    toggleFollowStore,
    isStoreFollowed,
    navigate,
    addToast,
    currentUser,
  } = useMarketplace();

  const cleanUsername = decodeURIComponent(username || '').trim().toLowerCase().replace(/\/+$/, '').replace(/^@/, '');
  const store =
    stores.find((s) => s.username.toLowerCase() === cleanUsername || s.id.toLowerCase() === cleanUsername) ||
    getStoreByUsername(cleanUsername);
  const [activeTab, setActiveTab] = useState<'products' | 'services' | 'reviews' | 'policies' | 'about'>('products');
  const [storeSearch, setStoreSearch] = useState('');
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  if (!store) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Store Not Found</h2>
        <p className="text-sm text-slate-400 mb-6">The storefront @{username} does not exist or may be pending verification.</p>
        <button
          onClick={() => navigate('/stores')}
          className="px-6 py-2.5 rounded-xl bg-[#245BFF] text-white text-xs font-semibold"
        >
          Browse All Stores
        </button>
      </div>
    );
  }

  const isFollowed = isStoreFollowed(store.username);
  const isOwnStore = Boolean(currentUser && store.ownerId === currentUser.id);
  const storeProducts = (products || [])
    .filter(
      (p) =>
        (p?.storeUsername && (p.storeUsername || '').toLowerCase() === (store.username || '').toLowerCase()) ||
        p?.sellerId === store.ownerId
    )
    .filter((p) => {
      if (!storeSearch.trim()) return true;
      return (p?.title || '').toLowerCase().includes(storeSearch.toLowerCase().trim());
    });

  const storeServices = (services || []).filter(
    (s) =>
      (s?.storeUsername && (s.storeUsername || '').toLowerCase() === (store.username || '').toLowerCase()) ||
      s?.sellerId === store.ownerId
  );

  const storeReviews = reviews.filter((r) => r.targetType === 'store' && r.targetId === store.username);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${store.name} on SHOPZA`,
          text: `Check out ${store.name} on SHOPZA: ${store.description}`,
          url: window.location.href,
        });
      } catch {
        // dismissed
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast('success', 'Link Copied', 'Storefront link copied to clipboard!');
    }
  };

  const handleStartChat = () => {
    setChatModalOpen(true);
  };

  return (
    <div className="w-full min-h-screen">
      {/* Store Customizer Announcement Bar */}
      {store.themeSettings?.announcementBarEnabled && (
        <div
          className="py-2 px-4 text-center text-xs font-semibold text-white tracking-wide shadow"
          style={{ backgroundColor: store.themeSettings.primaryColor || '#245BFF' }}
        >
          {store.themeSettings.announcementBarText || 'Welcome to our verified storefront!'}
        </div>
      )}

      {/* Store Banner */}
      <div className="relative h-48 sm:h-64 lg:h-80 w-full bg-[#FFFFFF] overflow-hidden">
        <img
          src={store.banner}
          alt={`${store.name} Cover`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFFFFF] via-black/40 to-transparent" />
      </div>

      {/* Store Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 -mt-16 sm:-mt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
          {/* Logo & Store Title */}
          <div className="flex items-end gap-5">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#FFFFFF] p-1 border-4 border-[#FFFFFF] shadow-2xl overflow-hidden shrink-0">
              <img
                src={store.logo}
                alt={store.name}
                referrerPolicy="no-referrer"
                className="w-full h-full rounded-xl object-cover"
              />
            </div>

            <div className="space-y-1 mb-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
                  {store.name}
                </h1>
                {store.isVerified && (
                  <span title="Verified Merchant">
                    <ShieldCheck className="w-5 h-5 text-[#245BFF] shrink-0" />
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <span>@{store.username}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  {store.location}
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 text-[#245BFF]">
                  <Clock className="w-3.5 h-3.5" />
                  Replies {store.responseTime}
                </span>
              </div>
            </div>
          </div>

            {/* Action Buttons: Follow, Message, Share */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => toggleFollowStore(store.username)}
              disabled={isOwnStore}
              title={isOwnStore ? 'You cannot follow your own store' : isFollowed ? 'Unfollow store' : 'Follow store'}
              className={`flex items-center gap-1.5 disabled:opacity-60 disabled:cursor-not-allowed px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isFollowed
                  ? 'bg-white/10 hover:bg-white/15 text-slate-200'
                  : 'bg-[#245BFF] hover:bg-[#7C3AED] text-white shadow-lg shadow-[#245BFF]/30'
              }`}
            >
              {isOwnStore ? (
                <><UserCheck className="w-4 h-4" /><span>Your Store</span></>
              ) : isFollowed ? (
                <>
                  <UserCheck className="w-4 h-4 text-[#245BFF]" />
                  <span>Following</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Follow Store</span>
                </>
              )}
            </button>

            <button
              onClick={handleStartChat}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-[#7C3AED]" />
              <span className="hidden sm:inline">Message</span>
            </button>

            <button
              onClick={() => setReviewModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-colors cursor-pointer"
              title="Drop a review for this store"
            >
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>Review Store</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-6 py-4 text-xs text-slate-300 border-b border-white/[0.06]">
          <StarRating rating={store.rating} count={store.reviewCount} size="sm" />
          <span className="text-slate-600">·</span>
          <span className="font-mono-nums">
            <strong className="text-white">{store.followerCount.toLocaleString()}</strong> Followers
          </span>
          <span className="text-slate-600">·</span>
          <span className="font-mono-nums">
            <strong className="text-white">{storeProducts.length}</strong> Products
          </span>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 py-4 border-b border-white/[0.08] overflow-x-auto">
          {[
            { id: 'products', label: `Products (${storeProducts.length})` },
            { id: 'services', label: `Services (${storeServices.length})` },
            { id: 'reviews', label: `Reviews (${storeReviews.length})` },
            { id: 'policies', label: 'Store Policies' },
            { id: 'about', label: 'About & Hours' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-white/10 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="py-8">
          {/* TAB 1: Products */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4 max-w-md">
                <div className="relative w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    value={storeSearch}
                    onChange={(e) => setStoreSearch(e.target.value)}
                    placeholder="Search this store..."
                    className="w-full pl-9 pr-3 py-2 bg-[#FFFFFF] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#245BFF]"
                  />
                </div>
              </div>

              {storeProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {storeProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center rounded-2xl bg-[#FFFFFF] border border-white/[0.06] text-xs text-slate-400">
                  <p className="text-sm font-semibold text-white mb-1">New and no product is found</p>
                  <p className="text-slate-500">This storefront has newly opened or no items matched your query.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Services */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              {storeServices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {storeServices.map((serv) => (
                    <div key={serv.id} className="p-5 rounded-2xl bg-[#FFFFFF] border border-white/[0.08] space-y-3">
                      <div className="aspect-16/9 rounded-xl overflow-hidden bg-[#F7F8FC]">
                        <img src={serv.images[0]} alt={serv.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      </div>
                      <h3 className="font-semibold text-white text-sm">{serv.title}</h3>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{serv.description}</p>
                      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                        <span className="text-slate-400">Starting from</span>
                        <span className="font-bold text-white font-mono-nums">₦{serv.startingPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center rounded-2xl bg-[#FFFFFF] border border-white/[0.06] text-xs text-slate-400">
                  This store does not offer bespoke services at this time.
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-6 max-w-3xl">
              {/* Reviews Header Banner with Review Button */}
              <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white">Storefront Ratings & Feedback</h3>
                    <StarRating rating={store.rating} count={storeReviews.length} size="sm" />
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Verified customer feedback on delivery, product authenticity, and service.
                  </p>
                </div>
                <button
                  onClick={() => setReviewModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-[#245BFF] hover:bg-[#7C3AED] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-[#245BFF]/25 cursor-pointer shrink-0"
                >
                  <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
                  <span>Write a Review</span>
                </button>
              </div>

              {storeReviews.length > 0 ? (
                <div className="space-y-4">
                  {storeReviews.map((rev) => (
                    <div key={rev.id} className="p-5 rounded-2xl bg-[#FFFFFF] border border-white/[0.06] space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img src={rev.userAvatar} alt={rev.userName} referrerPolicy="no-referrer" className="w-6 h-6 rounded-full" />
                          <span className="text-xs font-semibold text-white">{rev.userName}</span>
                        </div>
                        <StarRating rating={rev.rating} size="sm" showNumeric={false} />
                      </div>
                      {rev.title && <h4 className="text-xs font-semibold text-white">{rev.title}</h4>}
                      <p className="text-xs text-slate-300 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center rounded-2xl bg-[#FFFFFF] border border-white/[0.06] text-xs text-slate-400">
                  <p className="text-sm font-semibold text-white mb-1">No reviews yet</p>
                  <p className="text-slate-500 mb-4">Be the first to leave a verified rating for {store.name}.</p>
                  <button
                    onClick={() => setReviewModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-[#245BFF] text-white text-xs font-semibold"
                  >
                    Drop First Review
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Policies */}
          {activeTab === 'policies' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl text-xs text-slate-300">
              <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-white/[0.08] space-y-2">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <Truck className="w-4 h-4 text-[#245BFF]" />
                  <span>Shipping & Dispatch</span>
                </div>
                <p className="text-slate-400 leading-relaxed">{store.policies.shipping}</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-white/[0.08] space-y-2">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <RotateCcw className="w-4 h-4 text-[#245BFF]" />
                  <span>Returns & Exchanges</span>
                </div>
                <p className="text-slate-400 leading-relaxed">{store.policies.returns}</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-white/[0.08] space-y-2">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Order Cancellations</span>
                </div>
                <p className="text-slate-400 leading-relaxed">{store.policies.cancellation}</p>
              </div>
            </div>
          )}

          {/* TAB 5: About */}
          {activeTab === 'about' && (
            <div className="max-w-3xl space-y-6 text-xs text-slate-300">
              <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-white/[0.08] space-y-4">
                <h3 className="text-sm font-semibold text-white">About {store.name}</h3>
                <p className="text-slate-300 leading-relaxed text-sm">{store.description}</p>
                <div className="pt-4 border-t border-white/[0.06] grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-500 block mb-1">Operating Hours</span>
                    <span className="text-white font-medium">{store.operatingHours}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-1">Member Since</span>
                    <span className="text-white font-medium">{store.joinedDate}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Storefront Chat Modal (Requirement: Click message icon placed on storefront, chat with seller & seller replies manually) */}
      <StorefrontChatModal
        store={store}
        isOpen={chatModalOpen}
        onClose={() => setChatModalOpen(false)}
      />

      {/* Storefront Review Modal (Requirement: Review button where users can drop their reviews for a store) */}
      <StoreReviewModal
        store={store}
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        onReviewSubmitted={() => setActiveTab('reviews')}
      />
    </div>
  );
};
