using Microsoft.EntityFrameworkCore;
using TimeSheetHrEmployeeApp.Models;

namespace TimeSheetHrEmployeeApp.Context
{
    public class TimeSheetHrEmployeeContext : DbContext
    {
        public TimeSheetHrEmployeeContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<TimeSheet> TimeSheets { get; set; }
        public DbSet<TimeSheetDetails> TimesheetDetails { get; set; }
        public DbSet<Tasks> Tasks { get; set; }
        public DbSet<LeaveRequest> LeaveRequests { get; set; }
        public DbSet<Approval> Approvals { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TimeSheet>()
                .HasOne<User>(t => t.User)
                .WithMany(u => u.Timesheets);
            modelBuilder.Entity<LeaveRequest>()
                .HasOne<User>(t => t.User)
                .WithMany(u => u.LeaveRequests);
            modelBuilder.Entity<User>()
                .HasOne(u => u.Profiles)
                .WithOne(up => up.User);



        }
    }



}
