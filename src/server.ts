import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import isImage from 'is-image';
import request from 'request';

// import {response} from "@types/express";

(async () => {

  // Init the Express application
  const app = express();
  let err1: boolean=false;
  // Set the network port
  const port = process.env.PORT || 8082;
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());
  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]
  app.get( "/filteredimage", async ( req:express.Request, res:express.Response ) => {

    // validating the Query params Main URL .. 
    const options = {
      url: req.query.image_url
    };
    function callback(error: any, response: { statusCode: number; }, body: any) {
      if (!error && response.statusCode == 200) {
      }else 
      {
         err1=true;
         console.log("inside callback fn :",err1)
       res.status(422).send({message: "url response isnt valid or corrupted"})
      }
    }
    await request(options, callback)
    console.log("error :",err1)
    if (!err1){
        const isImageflag =  isImage(await req.query.image_url.toString())
        console.log("isImageflag",isImageflag)
        if (isImageflag) {
          var filteredImage :string = await filterImageFromURL(req.query.image_url.toString())
          res.status(200).sendFile(filteredImage);
          console.log(filteredImage)
          res.on('finish', function(){
            deleteLocalFiles([filteredImage]);
       });
          } else {
          res.status(422).send({
            message: "url sent isnt an Image"
          })
    
        }}
  });

  /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
