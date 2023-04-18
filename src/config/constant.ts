export class Constants {
    public static readonly ENVIRONMENTS = ["development", "stage", "production"];
    public static readonly FROM_EMAIL = "no-reply@example.com";
    public static readonly RESET_PASS_EXPIRY = 10 * 60; // 10 min
    public static readonly MAX_FILE_SIZE = 5 * 1024 * 1024;
    public static readonly VALID_MIMETYPES = [
      "image/jpeg", "image/png",
    ];
    public static readonly PAGER = {
      page: 1,
      limit: 20,
    };
    public static readonly LIMIT = 20;
    public static readonly OFFSET = 0;
  }
  