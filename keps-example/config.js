module.exports = {
	hostname:'example.acutulus.co',
	name:'recruiter',
	dbname:'recruiter-dev',
	dbhostname:'localhost',
	port:'60000',
  emailFrom:'Tavi Applicant Service <alert@taviapp.com>',
  emailTransport: 'SES',
  emailTransportProps: {
    accessKeyId: "AKIAJL6O3CDIOGAGHBHQ",
    secretAccessKey: "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",
    region:"us-west-2"
  }
}