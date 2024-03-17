using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ItemRental.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost]
        public async Task<IActionResult> UploadFile(List<IFormFile> files)
        {
            List<string> imageIds = new List<string>();
            try
            {
                foreach (IFormFile file in files)
                {
                    // Get the filename and extension
                    var fileName = Path.GetFileName(file.FileName);
                    var fileExtension = Path.GetExtension(fileName);

                    // Generate a unique filename to avoid conflicts
                    var uniqueFileName = Guid.NewGuid().ToString() + fileExtension;
                    imageIds.Add(uniqueFileName);

                    // Specify the directory where you want to save the file
                    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Images", uniqueFileName);

                    // Save the uploaded file to the specified directory
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }


                }
                return Ok(imageIds);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while uploading the files");
            }
        }
    }
}
