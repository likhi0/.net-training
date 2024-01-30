namespace TimeSheetHrEmployeeApp.Models.DTO
{
    public class ProfileDTO
    {
        public int ProfileId { get; set; }
        public string Username { get; set; } = string.Empty;

        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string ContactNumber { get; set; } = string.Empty;
        public string JobTitle { get; set; } = string.Empty;
        public string? Picture { get; set; }
    }
}
