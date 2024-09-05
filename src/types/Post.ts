export interface PostData {
  userId?: number;
  id: number;
  date?: string;
  title: string;
  body: string;
  tags: Array<string>;
}

export interface PostDataList {
  data: PostData[],
  page: number,
  limit: number,
  totalPages: number,
  totalPosts: number
}

export interface PostListProps {
  loading: boolean;
  posts: PostData[];
  fetchPosts: () => Promise<void>;
}
