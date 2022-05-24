/**
 * 
 * Examples of Queries and Mutations used in sandbox
 *
 * 

----------------------------------------------------------------
createDocumentPage Mutation


mutation Mutation($image: String!, $isDocumentCreated: Boolean!, $pageType: String, $documentAdvice: DocumentAdvice, $customerApiLink: String) {
  createDocumentPage(image: $image, isDocumentCreated: $isDocumentCreated, $pageType: String, documentAdvice: $documentAdvice, customerApiLink: $customerApiLink) {
    documentType {
      country
    }
  }
}


Variables:
{
  "customerApiLink": "/api/v1/customers/dbeef091-3b0a-46f2-a1a8-5e5b2ff81396",
  "image": "https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI",
  "isDocumentCreated": false,
  "pageType": "front"
  "documentAdvice": {
    "classification": {
        "countries": ["INO"],
        "types": [],
        "editions": [],
        "machineReadableTravelDocuments": []
      }
    }
  }

----------------------------------------------------------------
createSelfie Mutation

mutation Mutation($image: String!) {
  createSelfie(image: $image) {
    detection {
      confidence
      faceRectangle {
        topLeft {
          x
          y
        }
      }
    }
  }
}

Variables: 
{
  "image": "https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-5.jpg"
}

----------------------------------------------------------------
createCustomerLiveness Mutation

mutation CreateCustomerLiveness($image: String!,$isLivenessCreated: Boolean, $customerApiLink: String) {
  createCustomerLiveness(image: $image, isLivenessCreated: $isLivenessCreated, customerApiLink: $customerApiLink) {
    errorCode
    links {
      customer
    }
  }
}

Variables:
{
  "customerApiLink": "/api/v1/customers/123",
  "isLivenessCreated": false,
  "image": "https://upload.wikimedia.org/wikipedia/commons/6/6e/Kim_Jong-un_April_2019_%28cropped%29.jpg"
}

----------------------------------------------------------------
deleteCustomer Mutation

mutation DeleteCustomer($customerApiLink: String!) {
  deleteCustomer(customerApiLink: $customerApiLink)
}

Variables:
{
  "customerApiLink": "/api/v1/customers/123"
}

----------------------------------------------------------------
createFace Mutation

mutation CreateFace($image: String!) {
  createFace(image: $image){
    detection {
      confidence
    }
    links {
      self
    }
  }
}

Variables:
{
  "image": "image": "https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-5.jpg"
}


----------------------------------------------------------------
customer Query

query Query($customerApiLink: String!) {
  customer(customerApiLink: $customerApiLink) {
    customer {
      age {
        visualZone
      }
    }
  }
}

Variables:
{
  "customerApiLink": "api/v1/customers/123"
}

----------------------------------------------------------------
inspectDocument Query

query InspectDocument($customerApiLink: String!) {
  inspectDocument(customerApiLink: $customerApiLink) {
    expired
    pageTampering {
      colorProfileChangeDetected
      looksLikeScreenshot
    }
    mrzInspection {
      valid
    }
  }
}

Variables: 
{
  "customerApiLink": "/api/v1/customers/123"
}

----------------------------------------------------------------
inspectCustomer Query

 query InspectCustomer($customerApiLink: String!) {
  inspectCustomer(customerApiLink: $customerApiLink) {
    selfieInspection {
      similarityWith {
        documentPortrait
        livenessSelfies
      }
      genderEstimate
    }
  }
}

Variables:
{
  "customerApiLink": "/api/v1/customers/123"
}

----------------------------------------------------------------
faceQuality Query

query Query($faceApiLink: String!) {
  faceQuality(faceApiLink: $faceApiLink) {    
    sharpness {
        score
        preconditionsMet
    }
    brightness {
        score
        preconditionsMet
    }
  }
}

Variables:
{
  "faceApiLink": "/api/v1/faces/123"
}

----------------------------------------------------------------
query Query {
  metadata {
    documents {
      documentType {
        country
        edition
        type
        machineReadableTravelDocument
      }
      pages {
        name
        visualZone {
          name
          label
          valueNormalized
        }
      }
    }
  }
}

----------------------------------------------------------------
query normalizedDocumentImages($pages: [Page!]) {
  normalizedDocumentImages(pages: $pages) {
    front
    back
  }
}

Variables:
{  
  "pages": [
    {
      "link": "/api/v1/customers/123/document/pages/front"
    },
    {
      "link": "/api/v1/customers/123/document/pages/back"
    }
  ]
}

----------------------------------------------------------------
query CroppedImages($imageLinks: CroppedImageLinks!) {
  croppedImages(imageLinks: $imageLinks) {
    portrait
    ghostPortrait
    fingerprint
    signature
  }
}

Variables:
{
  "imageLinks": {
    "portrait": {
      "link": "/api/v1/customers/123/document/portrait",
      "dimensions": {
        "height": "150"
      }
    },
    "signature": {
      "dimensions": {
        "height": "50",
        "width": "50"
      },
      "link": "/api/v1/customers/123/document/signature"
    }
  }
}

----------------------------------------------------------------
query CroppedSelfie($faceApiLink: String!, $dimensions: ImageDimensions) {
  croppedSelfie(faceApiLink: $faceApiLink, dimensions: $dimensions) {
    selfie
  }
}

Variables:
{
  "faceApiLink": "/api/v1/faces/d21deb72-a443-4e80-a9de-1486c81c11ce",
  "dimensions": {
    "width": "150"
  }
}

----------------------------------------------------------------
evaluateCustomerLiveness Query

query EvaluateCustomerLiveness($type: EvaluateLivenessType!, $customerApiLink: String!) {
  evaluateCustomerLiveness(type: $type, customerApiLink: $customerApiLink) {
    liveness {
      score
      errorCode
    }
    links {
      customer
    }
}

Variables:
{
  "customerApiLink": "api/v1/customers/123",
  "type": "EYE_GAZE_LIVENESS"
}

----------------------------------------------------------------
storeCustomer Query

query StoreCustomer($customerApiLink: String!) {
  storeCustomer(customerApiLink: $customerApiLink) {
    customerId
    trustCenterId
    apiError {
      status
      path
      error
    }
  }
}

Variables:
{
  "customerApiLink": "api/v1/customers/123",
}

----------------------------------------------------------------
appInfo Query

query AppInfo {
  appInfo {
    disVersion
    samVersion
    iFaceVersion
  }
}

 */
