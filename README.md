# Aidoc-complete Extension README

Welcome to "Aidoc-complete", a handy extension that utilizes AI to generate text in Markdown files. By leveraging the power of OpenAI, it offers context-based suggestions to enhance your writing experience. 

**Please note:** The current version of Aidoc-complete primarily supports Markdown files and it might present a longer response time, as it is dependent on OpenAI API's response speed.

## Features

Aidoc-complete triggers line generation from the current position in your Markdown file, activated by pressing 'Ctrl+Space'. 

For the extension to function properly, ensure you have specified the OPENAI_API_KEY ("aidoc_complete.openaikey") in your settings.json. The key can be obtained from your OpenAI account at https://beta.openai.com/account/api-keys. 

Furthermore, you can specify the model used for text generation in settings.json as "aidoc_complete.model". By default, the extension uses the 'gpt-4' model. A list of all available models can be found at https://beta.openai.com/docs/api-reference/retrieve-engine.

## Requirements

Access to the OpenAI API is a prerequisite for using this extension. Obtain your OPENAI_API_KEY from https://beta.openai.com/account/api-keys.

## Extension Settings

Aidoc-complete includes the following settings:

- aidoc_complete.openaikey : This is where you specify your OpenAI API key. 
- aidoc_complete.model : Choose the model you wish to use for text generation.

For example, your settings.json might look like this:
```
{
    "aidoc_complete.openaikey": "XXXXXX_SOME_OPENAI_KEY_XXXXXX",
    "aidoc_complete.model": "gpt-4"
}
```

## Known Issues

As mentioned earlier, the response time might be longer due to the response speed of the OpenAI API. Unless an error message appears, be assured that the response is on its way.

## Release Notes

The initial version of Aidoc-complete allows you to generate text from the current location in your Markdown file using 'Ctrl+Space'.

### Version 0.0.1

This is the beta version of Aidoc-complete.
