var fs = require('fs');
var gulp = require('gulp');
var log = require('color-log');
const argv = require('yargs').argv;

gulp.task("upload:preprod", function () {
    var argvsLocal = argv;
    var awsKeyId = argvsLocal['accessKeyId'];
    var awsSecretKey = argvsLocal['secretAccessKey'];
    var awsBucketName = argvsLocal['bucketName'];

    var configS3 = {
        accessKeyId: awsKeyId,
        secretAccessKey: awsSecretKey,
        bucketName: awsBucketName
    };
    return uploadToS3(configS3, awsBucketName);
});

gulp.task("upload", function () {

    var configS3 = JSON.parse(fs.readFileSync('./.configuration/aws.json'));
    return uploadToS3(configS3, configS3.bucketName);

});

function uploadToS3(configS3, bucketName) {
    var s3 = require('gulp-s3-upload')(configS3);
    return gulp.src("./public/**")
        .pipe(s3({
            Bucket: bucketName, //  Required
            ACL: 'public-read'       //  Needs to be user-defined
        }, {
            // S3 Constructor Options, ie:
            maxRetries: 5
        }))
        ;
}