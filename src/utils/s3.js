import aws from 'aws-sdk'

aws.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_DEFAULT_REGION_NAME
})

const s3 = new aws.S3()

export default s3
