export type TUser = {
  paymentDetails: TPaymentDetails | undefined;
  addressDetails: TAddress | undefined;
  notificationSettings: TNotificationSettings | undefined;
  email: string;
  firstName: string;
  lastName?: string;
  image: TImage;
  badges: string[];
  role: string;
  userName?: string;
  phoneNumber?: string;
  auctionHistory: [];
  rating: number;
  inventory: TInventory[];
  _id: string;
};

export type TPaginationSearchParams = {
  page: number;
  limit: number;
  status?: string;
};

export type TSocialLogin = "google" | "facebook";

export type TMiniUser = Pick<
  TUser,
  "_id" | "email" | "firstName" | "lastName" | "image"
>;

export type TImage = {
  image_url: string;
  key: string;
  _id: string;
};

export type TNotificationSettings = {
  auctionEnded: string;
  biddingUpdate: string;
  newListing: string;
  paymentUpdate: string;
};

export type TAddress = {
  addressLine1: string;
  addressLine2: string;
  state: string;
  lga: string;
};

export type TPaymentDetails = {
  settlementAccount: {
    accountName: string;
    accountNumber: string;
    bankCode: string;
    bankName: string;
  };

  escrowAccountNumber: string;
  escrowBank: string;
  escrowAccountName: string;
};

export interface TPaginatedResponse {
  message: string;
  count: number;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
}
export interface TPaymentTransactions extends TPaginatedResponse {
  data: {
    transactionId: string;
    auction: TInventory;
    buyer: TMiniUser;
    payment: Partial<TPayment>;
    _id: string;
  }[];
}

export interface TAuctions extends TPaginatedResponse {
  auctions: TInventory[];
}

export interface TActiveBids extends TPaginatedResponse {
  bids: Bid[];
}

export interface TBidDataTable {
  auction: TInventory;
  bids: Bid[];
  isUseInAllBids?: boolean; //to determine if this table is used in auction bids or get all bids
}

export interface TBids extends TPaginatedResponse, TBidDataTable {}
export interface TBiddersPerformance extends TPaginatedResponse {
  data: {
    rank: 1;
    bidderAlias: string;
    image: string;
    userId: string;
    totalBidsMade: number;
    totalBidsWon: number;
    badgesEarned: string[];
  }[];
}

export interface TAuctionPerformance extends TPaginatedResponse {
  data: {
    rank: 1;
    item: Pick<
      TInventory,
      "title" | "images" | "startingBidAmount" | "slug" | "status"
    >;
    highestBid: number;
    totalBids: number;
    numberOfBidders: number;
    auctionStatus: string;
  }[];
}

export type TInventory = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  startingBidAmount: number;
  currentBidAmount: number;
  category?: string;
  seller: string | TMiniUser;
  bids: { bidder: TMiniUser; amount: number; timestamp: Date }[];
  status: "completed" | "ongoing" | "cancelled" | "pending";
  totalBids: 0;
  numberOfBidders: 0;
  startTime: Date;
  endTime: Date;
  price: number;
  escrowType: "public" | "private";
  privateUrlLink: string;
  images: TImage[];
  currentBidWinner: string | TMiniUser;
};

export type TBidders = {
  bids: Bid[];
};

export interface Bid {
  _id: string;
  status: string;
  auction: TInventory;
  bidder: TMiniUser;
  amount: number;
  timestamp: string;
  __v: number;
}

export interface INotification {
  userId: string;
  title: string;
  type:
    | "new_listing"
    | "bid_status"
    | "auction_ended"
    | "payment_reminder"
    | "watch_list";
  message: string;
  status: "new" | "read";
  timestamp: Date;
  _id: string;
}
export interface TInitiatePayment {
  message: string;
  paymentDetails: {
    payment: TPayment;
    virtualAccount: TVirtualAccount;
  };
}

interface TVirtualAccount {
  accountNumber: number;
  accountName: string;
  bankName: string;
  totalAmount: number;
  expiresAt: string;
}

interface TPayment {
  status: string;
  paymentMethod: string;
  transactionReference: string;
  auctions: string[];
  buyer: string;
  totalFee: number;
  totalAmount: number;
  receiptUrl: string | undefined;
  beneficiaryAccountNumber: number;
  timestamp: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
}
