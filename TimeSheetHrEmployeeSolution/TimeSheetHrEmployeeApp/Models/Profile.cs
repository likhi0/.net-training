using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TimeSheetHrEmployeeApp.Models
{
    
    public class Profile
    {
        public int ProfileId { get; set; }
     
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ContactNumber { get; set; }
        public string JobTitle { get; set; }
        public string? Picture {  get; set; }
        [ForeignKey("Username")]
         public User? User{ get; set; } 

    }
}
