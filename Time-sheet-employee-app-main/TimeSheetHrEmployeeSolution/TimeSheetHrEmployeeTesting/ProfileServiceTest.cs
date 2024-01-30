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
    public class ProfileServiceTest
    {
        IRepository<int, Profile> repository;
        [SetUp]
        public void Setup()
        {
            var dbOptions = new DbContextOptionsBuilder<TimeSheetHrEmployeeContext>()
                               .UseInMemoryDatabase("dbTestCustomer")//a database that gets created temp for testing purpose
                               .Options;
            TimeSheetHrEmployeeContext context = new TimeSheetHrEmployeeContext(dbOptions);
            repository = new ProfileRepository(context);
        }
        [Test]
        public void AddProfileTest()
        {
            IProfileService profileService = new ProfileService(repository);
            var profileDTO = new ProfileDTO
            {
                Username = "testUser",
                FirstName = "Test",
                LastName = "User",
                ContactNumber = "1234567890",
                JobTitle = "Tester",

            };

            // Act
            var result = profileService.AddProfile(profileDTO);

            // Assert
            Assert.IsTrue(result);

        }
        [Test]
        public void GetUserProfileTest()
        {
            IProfileService profileService = new ProfileService(repository);

            // Add a profile for testing
            var profileDTO = new ProfileDTO
            {
                Username = "testUser",
                FirstName = "Test",
                LastName = "User",
                ContactNumber = "1234567890",
                JobTitle = "Tester",
            };
            profileService.AddProfile(profileDTO);

            // Act
            var userProfile = profileService.GetUserProfile("testUser");

            // Assert
            Assert.IsNotNull(userProfile);
            Assert.That(userProfile.Username, Is.EqualTo("testUser"));
            Assert.That(userProfile.FirstName, Is.EqualTo("Test"));
            Assert.That(userProfile.LastName, Is.EqualTo("User"));
            Assert.That(userProfile.ContactNumber, Is.EqualTo("1234567890"));
            Assert.That(userProfile.JobTitle, Is.EqualTo("Tester"));
        }
        [Test]
        public void UpdateProfileTest()
        {
            // Arrange
            IProfileService profileService = new ProfileService(repository);

            // Create an updated profile
            var updatedProfileDTO = new ProfileDTO
            {
                Username = "testUser",
                FirstName = "UpdatedTest",
                LastName = "UpdatedUser",
                ContactNumber = "9876543210",
                JobTitle = "UpdatedTester",
            };

            // Act and Assert
            Assert.Throws<NoProfileFoundException>(() => profileService.UpdateProfile(updatedProfileDTO));
        }
        [Test]
        public void DeleteProfileTest()
        {
            IProfileService profileService = new ProfileService(repository);

            // Add a profile for testing
            var profileDTO = new ProfileDTO
            {
                Username = "testUser",
                FirstName = "Test",
                LastName = "User",
                ContactNumber = "1234567890",
                JobTitle = "Tester",
            };
            profileService.AddProfile(profileDTO);

            // Act
            var result = profileService.DeleteProfile("testUser");

            // Assert
            Assert.IsTrue(result);
        }



    }
}
