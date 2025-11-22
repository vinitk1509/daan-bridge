
import React, { useState } from 'react';
import { useApp } from '../context';
import { Card, Button, Modal, Input } from '../components/UI';
import { MOCK_GALLERY_POSTS } from '../data';
import { Heart, MessageCircle, Share2, Upload, Image as ImageIcon, MoreHorizontal } from 'lucide-react';

export const Gallery = () => {
  const { user } = useApp();
  const [posts, setPosts] = useState(MOCK_GALLERY_POSTS);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({ caption: '', image: '' });

  const handleUpload = () => {
    const newPost = {
      id: `g${Date.now()}`,
      userId: user?.id || 'u1',
      userName: user?.name || 'Anonymous',
      userAvatar: user?.avatar || 'https://i.pravatar.cc/150',
      image: uploadForm.image || 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800',
      caption: uploadForm.caption,
      likes: 0,
      date: 'Just now',
      role: user?.role || 'INDIVIDUAL'
    };
    setPosts([newPost, ...posts]);
    setShowUploadModal(false);
    setUploadForm({ caption: '', image: '' });
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Impact Gallery</h1>
          <p className="text-slate-500 dark:text-slate-400">Share your stories, successful donations, and volunteer moments.</p>
        </div>
        <Button onClick={() => setShowUploadModal(true)} className="flex items-center gap-2">
          <Upload size={18} /> Upload Photo
        </Button>
      </div>

      {/* Gallery Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {posts.map(post => (
          <Card key={post.id} className="break-inside-avoid mb-6">
             <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <img src={post.userAvatar} alt={post.userName} className="w-8 h-8 rounded-full object-cover" />
                   <div>
                      <p className="text-sm font-bold text-slate-800 dark:text-white">{post.userName}</p>
                      <p className="text-[10px] text-slate-500">{post.date} • {post.role}</p>
                   </div>
                </div>
                <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal size={18} /></button>
             </div>
             <div className="relative aspect-auto">
                <img src={post.image} alt="Post" className="w-full h-auto object-cover" />
             </div>
             <div className="p-4">
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">{post.caption}</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                   <div className="flex gap-4">
                      <button 
                        onClick={() => handleLike(post.id)}
                        className="flex items-center gap-1 text-slate-500 hover:text-red-500 transition-colors"
                      >
                         <Heart size={20} />
                         <span className="text-sm">{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 text-slate-500 hover:text-primary-500 transition-colors">
                         <MessageCircle size={20} />
                      </button>
                   </div>
                   <button className="text-slate-500 hover:text-blue-500 transition-colors">
                      <Share2 size={20} />
                   </button>
                </div>
             </div>
          </Card>
        ))}
      </div>

      {/* Upload Modal */}
      <Modal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)} title="Share Your Impact">
         <div className="space-y-4">
             <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors relative overflow-hidden">
                {uploadForm.image ? (
                   <img src={uploadForm.image} className="w-full h-full object-cover" alt="Preview" />
                ) : (
                   <>
                     <ImageIcon size={48} className="text-slate-300 mb-2" />
                     <p className="text-sm font-medium text-slate-500">Click to select photo</p>
                   </>
                )}
                <input 
                   type="file" 
                   className="absolute inset-0 opacity-0 cursor-pointer" 
                   onChange={(e) => {
                       // Mock image preview
                       if(e.target.files && e.target.files[0]) {
                           setUploadForm({...uploadForm, image: URL.createObjectURL(e.target.files[0])})
                       }
                   }} 
                />
             </div>
             <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Caption / Thought</label>
                <textarea 
                   className="w-full p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none h-24 resize-none"
                   placeholder="Share your experience, a thought about this moment, or tag people..."
                   value={uploadForm.caption}
                   onChange={e => setUploadForm({...uploadForm, caption: e.target.value})}
                ></textarea>
             </div>
             <Button className="w-full" onClick={handleUpload} disabled={!uploadForm.caption}>Post to Gallery</Button>
         </div>
      </Modal>
    </div>
  );
};
