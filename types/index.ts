export interface Video {
  id: string;
  youtubeId: string;
  category: string;
  thumbnail: string;
  title: string;
  channelName: string;
  channelAvatar: string;
  views: string;
  uploadedAt: string;
  duration: string;
  channelVerified?: boolean;
  description?: string;
}

export interface UserSession {
  userId: string;
  email: string;
  username: string;
}

export interface ApiResponse<T = undefined> {
  success: boolean;
  message: string;
  data?: T;
}
