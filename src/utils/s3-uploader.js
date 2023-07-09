import { PUBLIC_AWS_REGION, PUBLIC_AWS_BUCKET, PUBLIC_IDENTITY_POOL_ID } from '$env/static/public';


export async function uploadMedia(file, directory = "") {
  AWS.config.update({
    region: PUBLIC_AWS_REGION,
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: PUBLIC_IDENTITY_POOL_ID
    })
  });

  const getFileExtension = (str) => str.slice(str.lastIndexOf("."));
  const directoryKey = directory ? directory + "/" : "";
  const fileName = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-z0-9]/gi, '-').toLowerCase();
  const fileExtention = getFileExtension(file.name)
  const fullKey = directoryKey + fileName + fileExtention;

  const upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: PUBLIC_AWS_BUCKET,
      Key: fullKey,
      Body: file,
    }
  });

  try {
    const res = await upload.promise();
    return [file.name, res.Location];
  } catch (err) {
    return alert(`There was an error uploading your photo: ${err}`);
  }
}

function getFileExtension(str) {
    return str.slice(str.lastIndexOf("."));
  }
  
  function generateRandomString(length) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  
  export function generateFileWithUniqueName(file) {
    const fileExtension = getFileExtension(file.name);
    const newFileName = `${file.name.replace(/\.[^/.]+$/, "")}-${generateRandomString(8)}${fileExtension}`
  
    return new File([file], newFileName, {
      type: file.type
    });
  }