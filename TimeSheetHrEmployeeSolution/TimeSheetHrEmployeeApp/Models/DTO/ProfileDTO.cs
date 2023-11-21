namespace TimeSheetHrEmployeeApp.Models.DTO
{
    public class ProfileDTO
    {
        public int ProfileId { get; set; } 
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ContactNumber { get; set; }
        public string JobTitle { get; set; }
        public string? Picture { get; set; }
    }
}
