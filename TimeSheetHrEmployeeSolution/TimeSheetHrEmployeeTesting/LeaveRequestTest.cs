using Microsoft.Build.Framework;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TimeSheetHrEmployeeApp.Context;
using TimeSheetHrEmployeeApp.Exceptions;
using TimeSheetHrEmployeeApp.Interface;
using TimeSheetHrEmployeeApp.Models;
using TimeSheetHrEmployeeApp.Models.DTO;
using TimeSheetHrEmployeeApp.Repositories;
using TimeSheetHrEmployeeApp.Services;

namespace TimeSheetHrEmployeeTesting
{
    public class LeaveRequestTest
    {
        IRepository<int, LeaveRequest> repository;
        [SetUp]
        public void Setup()
        {
            var dbOptions = new DbContextOptionsBuilder<TimeSheetHrEmployeeContext>()
                               .UseInMemoryDatabase("dbTestCustomer")//a database that gets created temp for testing purpose
                               .Options;
            TimeSheetHrEmployeeContext context = new TimeSheetHrEmployeeContext(dbOptions);
            repository = new LeaveRequestRepository(context);
        }
        [Test]
        public void AddLeave()
        {
            ILeaveRequestService leaverequesttService = new LeaveRequestService(repository);
            var Leaverequest = new LeaveRequest
            {
                Username = "hemanth@gmail.com",
                StartDate = DateTime.Now.AddDays(1),
                EndDate = DateTime.Now.AddDays(2),
                Status = "pending"

            };
            var result = leaverequesttService.AddLeave(Leaverequest);

            // Assert
            Assert.IsTrue(result);
        }
        [Test]
        public void GetAllLeavesTest()
        {
            ILeaveRequestService leaverequesttService = new LeaveRequestService(repository);
            string username = "testuser";

            Assert.Throws<NoLeaveRequestAvailableException>(() => leaverequesttService.GetAllLeaves(username));
        }

    }
}
