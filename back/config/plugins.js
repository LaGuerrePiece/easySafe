module.exports = ({ env }) => ({
  // ...
  email: {
    config: {
      provider: "strapi-provider-email-mailjet",
      providerOptions: {
        publicApiKey: env("MAILJET_PUBLIC_KEY"),
        secretApiKey: env("MAILJET_SECRET_KEY"),
      },
      settings: {
        defaultFrom: "no-reply-easysafe@email.com",
        defaultFromName: "Scott from iJS.to",
        defaultTo: "baris.florent@gmail.com",
        defaultToName: "Johnny Bravodoe",
      },
    },
    // ...
  }
});
