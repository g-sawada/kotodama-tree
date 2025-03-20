export interface FlashContent {
  type: "error" | "success" | "info" | "warning";
  message: string | null;
}