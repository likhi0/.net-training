﻿using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TimeSheetHrEmployeeApp.Models
{
    
    public class Profile
    {
        public int ProfileId { get; set; }
     
        public string Username { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string ContactNumber { get; set; } = string.Empty;
        public string JobTitle { get; set; } = string.Empty;
        public string? Picture {  get; set; }
        [ForeignKey("Username")]
         public User? User{ get; set; } 

    }
}
