import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Send, ThumbsUp, Clock } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { GAMES } from "@/data/games";

import { PixelCharacter } from "@/components/PixelCharacters";

interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  time: string;
  likes: number;
  liked: boolean;
}

const INITIAL_COMMENTS: Comment[] = [
  {
    id: "1",
    author: "PixelHunter42",
    avatar: "🎮",
    text: "Hades at this price is an absolute steal. One of the best roguelikes ever made!",
    time: "2 hours ago",
    likes: 24,
    liked: false,
  },
  {
    id: "2",
    author: "DealWizard",
    avatar: "🧙",
    text: "Cyberpunk is finally worth it after all the patches. Grabbed it on GOG for the discount.",
    time: "5 hours ago",
    likes: 18,
    liked: false,
  },
  {
    id: "3",
    author: "RetroGamer99",
    avatar: "👾",
    text: "Stardew Valley never goes on sale, so that 50% off is genuinely rare. Highly recommend!",
    time: "1 day ago",
    likes: 31,
    liked: false,
  },
  {
    id: "4",
    author: "BudgetPlayer",
    avatar: "💰",
    text: "Hollow Knight under ₹300 is the best deal I've seen this month. Go for it.",
    time: "1 day ago",
    likes: 12,
    liked: false,
  },
];

export default function CommentsPage() {
  const { regionId, settings } = useApp();
  const [comments, setComments] = useState(INITIAL_COMMENTS);
  const [newComment, setNewComment] = useState("");


  const handleSubmit = () => {
    if (!newComment.trim()) return;
    const comment: Comment = {
      id: Date.now().toString(),
      author: "You",
      avatar: "⭐",
      text: newComment.trim(),
      time: "Just now",
      likes: 0,
      liked: false,
    };
    setComments((prev) => [comment, ...prev]);
    setNewComment("");
  };

  const handleLike = (id: string) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 }
          : c,
      ),
    );
  };

  const filteredComments = comments;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple/10 border border-purple/20 rounded-full mb-4">
          <span className="font-pixel text-[7px] text-purple tracking-wider">DISCUSS</span>
        </div>
        <h1 className="font-pixel text-xl text-foreground text-crt-shift">
          COMMUNITY
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Share tips, reviews, and deal finds with fellow gamers.
        </p>
      </div>

      {/* New comment */}
      <div className="mb-6 p-4 bg-screen-dark border border-border rounded-xl">
        <div className="flex items-start gap-3">
          {settings.characters && (
            <PixelCharacter character="loot" size="w-8 h-8" />
          )}
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share a deal tip, review, or recommendation..."
              rows={3}
              className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:border-cyan focus:ring-1 focus:ring-cyan/30 outline-none transition-colors resize-none"
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={handleSubmit}
                disabled={!newComment.trim()}
                className="flex items-center gap-2 px-5 py-2 bg-cyan/10 border border-cyan/30 text-cyan font-pixel text-[8px] rounded-lg hover:bg-cyan/20 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="w-3 h-3" />
                POST
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments list */}
      <div className="space-y-3">
        {filteredComments.map((comment, i) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-4 bg-screen-dark border border-border rounded-xl hover:border-cyan/20 transition-colors"
          >
            <div className="flex items-start gap-3">
              <span className="text-xl shrink-0">{comment.avatar}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-pixel text-[8px] text-foreground">
                    {comment.author}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Clock className="w-2.5 h-2.5" />
                    {comment.time}
                  </span>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {comment.text}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <button
                    onClick={() => handleLike(comment.id)}
                    className={`flex items-center gap-1 text-xs transition-colors cursor-pointer ${
                      comment.liked
                        ? "text-cyan"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <ThumbsUp
                      className={`w-3 h-3 ${comment.liked ? "fill-current" : ""}`}
                    />
                    {comment.likes}
                  </button>
                  <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    <MessageCircle className="w-3 h-3" />
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick game picks for context */}
      <div className="mt-8 p-5 bg-screen-dark border border-border rounded-xl">
        <h3 className="font-pixel text-[9px] text-magenta mb-3 tracking-wider">
          TRENDING DISCUSSIONS
        </h3>
        <div className="space-y-2">
          {GAMES.slice(0, 4).map((game) => (
            <div
              key={game.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded overflow-hidden bg-surface shrink-0">
                <img
                  src={game.imageUrl}
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-foreground truncate">{game.title}</p>
                <p className="text-[10px] text-muted-foreground">
                  {game.prices[regionId].discount > 0
                    ? `${game.prices[regionId].discount}% off`
                    : "Full price"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
