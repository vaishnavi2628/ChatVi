import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api";
import { Link } from "react-router";
import { MessageCircleIcon, VideoIcon, MapPinIcon } from "lucide-react";
import { getLanguageFlag } from "../components/FriendCard";
import { capitialize } from "../lib/utils";
import NoFriendsFound from "../components/NoFriendsFound";

const FriendsPage = () => {
  const { data: friends = [], isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Friends</h2>
          <span className="badge badge-primary badge-lg">{friends.length} Friends</span>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <div
                key={friend._id}
                className="card bg-base-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="card-body p-5 space-y-4">
                  {/* Avatar + Online Status */}
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="avatar size-14 rounded-full">
                        <img src={friend.profilePic} alt={friend.fullName} />
                      </div>
                      {/* Online indicator */}
                      <span
                        className={`absolute bottom-0 right-0 size-3 rounded-full border-2 border-base-200 ${
                          friend.isOnline ? "bg-success" : "bg-base-300"
                        }`}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base">{friend.fullName}</h3>
                      <p
                        className={`text-xs flex items-center gap-1 ${
                          friend.isOnline ? "text-success" : "opacity-50"
                        }`}
                      >
                        <span
                          className={`size-1.5 rounded-full inline-block ${
                            friend.isOnline ? "bg-success" : "bg-base-content opacity-50"
                          }`}
                        />
                        {friend.isOnline ? "Online" : "Offline"}
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  {friend.location && (
                    <div className="flex items-center text-xs opacity-60">
                      <MapPinIcon className="size-3 mr-1" />
                      {friend.location}
                    </div>
                  )}

                  {/* Languages */}
                  <div className="flex flex-wrap gap-1.5">
                    <span className="badge badge-secondary badge-sm">
                      {getLanguageFlag(friend.nativeLanguage)}
                      Native: {capitialize(friend.nativeLanguage)}
                    </span>
                    <span className="badge badge-outline badge-sm">
                      {getLanguageFlag(friend.learningLanguage)}
                      Learning: {capitialize(friend.learningLanguage)}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-2">
                    <Link
                      to={`/chat/${friend._id}`}
                      className="btn btn-primary btn-sm flex-1"
                    >
                      <MessageCircleIcon className="size-4" />
                     
                    </Link>
                    <Link
                      to={`/call/${friend._id}`}
                      className="btn btn-success btn-sm flex-1 text-white"
                    >
                      <VideoIcon className="size-4" />
                      Call
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsPage;