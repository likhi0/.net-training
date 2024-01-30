using log4net.Repository.Hierarchy;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Framework;
using Microsoft.Extensions.Logging;
using TimeSheetHrEmployeeApp.Interface;
using TimeSheetHrEmployeeApp.Models;
using TimeSheetHrEmployeeApp.Models.DTO;
using TimeSheetHrEmployeeApp.Services;

namespace TimeSheetHrEmployeeApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("reactApp")]
    public class ProfileController : ControllerBase
    {
        private readonly IProfileService _profileService;
        private readonly ILogger<ProfileController> _logger;

        public ProfileController(IProfileService profileService, ILogger<ProfileController> logger)
        {
            _profileService = profileService;
            _logger = logger;

        }
        /// <summary>
        /// adding the profile
        /// </summary>
        /// <param name="profileDTO"></param>
        /// <returns></returns>

        [HttpPost]
        public IActionResult AddProfile(ProfileDTO profileDTO)
        {
            var result = _profileService.AddProfile(profileDTO);
            if (result)
            {
                _logger.LogInformation("Profile Add");
                return Ok(profileDTO);
            }
            _logger.LogError("Profile added failed");
            return BadRequest("Could not add the profile");
        }
        /// <summary>
        /// updating the prodile
        /// </summary>
        /// <param name="id"></param>
        /// <param name="profileDTO"></param>
        /// <returns></returns>

        [HttpPut]
        public IActionResult UpdateProfile( ProfileDTO profileDTO)
        {
            var updatedProfile = _profileService.UpdateProfile(profileDTO);

            if (updatedProfile != null)
            {
                _logger.LogInformation("Profile Updated");
                return Ok(updatedProfile);
            }

            _logger.LogError("Profile update failed");
            return BadRequest("Could not update the profile");
        }
        /// <summary>
        /// deleting the profile
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        
        [HttpDelete("DeleteProfile")]
        [Authorize(Roles = "HR")]
        public IActionResult DeleteProfile(string username)
        { 
            var result = _profileService.DeleteProfile(username);
            if(result)
            {
                _logger.LogInformation("Delete Profile");
                return Ok("profile is deleted");
            }
            _logger.LogError("profile delete failed");
            return BadRequest("not delete");
        }
        
        [HttpGet]
        public ActionResult GetUserProfile(string Username)
        {
            var result = _profileService.GetUserProfile(Username);
            if (result != null)
            {
                _logger.LogInformation("Get user profile");
                return Ok(result);
            }

            _logger.LogError("failed to get profile");
            return BadRequest("No profile found");
        }
    }
}
