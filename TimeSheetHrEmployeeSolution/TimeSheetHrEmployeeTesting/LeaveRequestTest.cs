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
        public void GetAllLeaves()
        {
            ILeaveRequestService leaverequestService = new LeaveRequestService(repository);
            var username = "hemanth@gmail.com";

            // Add some leave requests for testing
            var leaveRequest1 = new LeaveRequest
            {
                Username = username,
                StartDate = DateTime.Now.AddDays(1),
                EndDate = DateTime.Now.AddDays(2),
                Status = "pending"
            };

            var leaveRequest2 = new LeaveRequest
            {
                Username = username,
                StartDate = DateTime.Now.AddDays(3),
                EndDate = DateTime.Now.AddDays(4),
                Status = "approved"
            };

            leaverequestService.AddLeave(leaveRequest1);
            leaverequestService.AddLeave(leaveRequest2);

            // Act
            var leaveRequests = leaverequestService.GetAllLeaves(username);

            // Assert
            Assert.IsNotNull(leaveRequests);
            Assert.AreEqual(2, leaveRequests.Count);

            // Use NUnit constraints for better readability
            Assert.That(leaveRequests, Has.Exactly(1).Property(nameof(LeaveRequest.Status)).EqualTo("pending"));
            Assert.That(leaveRequests, Has.Exactly(1).Property(nameof(LeaveRequest.Status)).EqualTo("approved"));
        }

    }
}
