using TimeSheetHrEmployeeApp.Models;
using TimeSheetHrEmployeeApp.Models.DTO;
using TimeSheetHrEmployeeApp.Interface;
using TimeSheetHrEmployeeApp.Models;
using TimeSheetHrEmployeeApp.Models.DTO;
using TimeSheetHrEmployeeApp.Exceptions;

namespace TimeSheetHrEmployeeApp.Services
{
    public class ProfileService : IProfileService
    {
        private readonly IRepository<int, Profile> _profileRepository;

        public ProfileService(IRepository<int, Profile> profileRepository)
        {
            _profileRepository = profileRepository;
        }
        /// <summary>
        /// adding the profile
        /// </summary>
        /// <param name="profileDTO"></param>
        /// <returns></returns>

        public bool AddProfile(ProfileDTO profileDTO)
        {
            
            var profile = new Profile
            {
                Username = profileDTO.Username,
                FirstName = profileDTO.FirstName,
                LastName = profileDTO.LastName,
                ContactNumber = profileDTO.ContactNumber,
                JobTitle = profileDTO.JobTitle,
                Picture = profileDTO.Picture
            };
            
           
            var result = _profileRepository.Add(profile);

            if (result != null)
            {
                
                return true;
            }

            return false ;
        }
        /// <summary>
        /// updatig the profile
        /// </summary>
        /// <param name="id"></param>
        /// <param name="profileDTO"></param>
        /// <returns></returns>
        public ProfileDTO UpdateProfile(int id, ProfileDTO profileDTO)
        {
           
            var existingProfile = _profileRepository.GetById(id);
            if (existingProfile != null)
            {

                existingProfile.Username = profileDTO.Username;
                existingProfile.FirstName = profileDTO.FirstName;
                existingProfile.LastName = profileDTO.LastName;
                existingProfile.ContactNumber = profileDTO.ContactNumber;
                existingProfile.JobTitle = profileDTO.JobTitle;
                existingProfile.Picture = profileDTO.Picture;

                var result = _profileRepository.Update(existingProfile);



                return profileDTO;
            }
          

            return null;
        }
        /// <summary>
        /// deleting the profile
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>

        public bool DeleteProfile(int id)
        {

            var result = _profileRepository.Delete(id);

            if (result != null)
            {

                return true;
            }

            return false;
        }

       
    }
}
