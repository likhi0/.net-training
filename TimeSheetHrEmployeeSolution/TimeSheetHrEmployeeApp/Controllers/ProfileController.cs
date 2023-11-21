using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TimeSheetHrEmployeeApp.Interface;
using TimeSheetHrEmployeeApp.Models;
using TimeSheetHrEmployeeApp.Models.DTO;

namespace TimeSheetHrEmployeeApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly IProfileService _profileService;

        public ProfileController(IProfileService profileService)
        {
            _profileService = profileService;
        }

        [HttpPost]
        public IActionResult AddProfile(ProfileDTO profileDTO)
        {
            var result = _profileService.AddProfile(profileDTO);
            if (result)
                return Ok(profileDTO);
            return BadRequest("Could not add the profile");
        }

        [HttpPut]
        public IActionResult UpdateProfile([FromBody] ProfileDTO profileDTO)
        {
            var updatedProfile = _profileService.UpdateProfile(profileDTO);

            if (updatedProfile == null)
            {
                return NotFound();
            }

            return Ok(updatedProfile);
        }
        [HttpDelete]
        public IActionResult DeleteProfile(ProfileDTO profileDTO)
        {
            string errorMessage = string.Empty;
            try
            {
                var result = _profileService.DeleteProfile(profileDTO);
                return Ok(profileDTO);
            }
            catch (Exception e)
            {
                errorMessage = e.Message;
            }
            return BadRequest(errorMessage);
        }

    }
}
