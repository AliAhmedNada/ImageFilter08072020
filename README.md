# Udagram Image Filtering Microservice

# Github Repository URL
- https://github.com/muradbiskin/udacity-cloud-developer-project-2

# Elastic BeanStalk URL
Please Change the host in the postman to be the below to test filter
- http://imagefilterudacity-env.eba-pjcpytru.us-east-1.elasticbeanstalk.com/

Example: `http://imagefilterudacity-env.eba-pjcpytru.us-east-1.elasticbeanstalk.com/filteredimage?image_url=https://images-na.ssl-images-amazon.com/images/G/01/awssignin/static/aws_logo_smile.png`

## Tasks

### Setup Node Enviornment

You'll need to create a new node server. Open a new terminal within the project directory and run:

1. Initialize a new project: `npm i`
2. run the development server with `npm run dev`

### Create a new endpoint in the server.ts file

The starter code has a task for you to complete an endpoint in `./src/server.ts` which uses query paramater to download an image from a public URL, filter the image, and return the result.

We've included a few helper functions to handle some of these concepts and we're importing it for you at the top of the `./src/server.ts`  file.

```typescript
import {filterImageFromURL, deleteLocalFiles} from './util/util';
```

### Deploying your system

Follow the process described in the course to `eb init` a new application and `eb create` a new enviornment to deploy your image-filter service! Don't forget you can use `eb deploy` to push changes.
