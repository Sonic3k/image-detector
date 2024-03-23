import express from "express";
import {filterImageFromURL, deleteLocalFiles} from '../util/util.js';

export const router = express.Router();


// Endpoint to filter an image from a public URL
router.get('/filteredimage', async (req, res) => {
    const imageUrl = req.query.image_url;
  
    // Validate image_url query parameter
    if (!imageUrl) {
      return res.status(400).send('image_url parameter is required');
    }

    console.log(imageUrl);
  
    try {
      // Call filterImageFromURL function to filter the image
      const filteredImagePath = await filterImageFromURL(imageUrl);
  
      // Send the resulting file in the response
      res.sendFile(filteredImagePath, {}, (err) => {
        // Delete the local file after sending the response
        if (err) {
          console.error('Error sending file:', err);
        }
        deleteLocalFiles([filteredImagePath]);
      });
    } catch (error) {
      console.error('Error filtering image:', error);
      res.status(500).send('Error filtering image');
    }
  });
  