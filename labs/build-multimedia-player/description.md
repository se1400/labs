# Build a Multimedia Player

In the prior lessons, you were introduced to working with <code>audio</code> and <code>video</code> elements. In this lab, you will build out a multimedia player that will display an <code>audio</code> track and <code>video</code> with a transcript.

For the <code>audio</code> element, you will need to include a <code>source</code> element which is used to specify the media being used.

Here is an example:

```html
<audio controls aria-label="descriptive label goes here">
  <source src="url-to-audio-goes-here" type="audio/mpeg">
</audio>
```

The <code>source</code> element can also be used in the <code>video</code> element like this:

```html
<video controls width="600" aria-label="descriptive label goes here">
  <source src="link-to-mp4-goes-here" type="video/mp4">
  <!-- Remaining code goes here -->
</video>
```

**Objective:** Fulfill the user stories below and get all the tests to pass to complete the lab.

## User Stories:

1. You should have an <code>h1</code> element for the main title of the page.

2. You should have three <code>section</code> elements.

3. Inside the first <code>section</code> element, you should have an <code>h2</code> element for the title of song playing.

4. Below the <code>h2</code> element, you should have an <code>audio</code> element with <code>controls</code> attribute and an <code>aria-label</code> attribute.

5. Inside the <code>audio</code> element, you should have a <code>source</code> element with a <code>src</code> attribute pointing to an audio file and a <code>type</code> attribute. You are free to use this audio URL if you like: <code>https://se1400.github.io/labs/assets/sailing-away.mp3</code>

6. Inside the second <code>section</code> element, you should have an <code>h2</code> element for the title of the video playing.

7. Below the <code>h2</code> element, you should have a <code>video</code> element with <code>controls</code>, <code>width</code> attributes and an <code>aria-label</code> attribute.

8. Inside the <code>video</code> element, you should have a <code>source</code> element with a <code>src</code> attribute pointing to a video file and a <code>type</code> attribute. You are free to use this video URL if you like: <code>https://se1400.github.io/labs/assets/mov_bbb.mp4</code>

9. Below the <code>source</code> element, you should have a <code>track</code> element with a <code>src</code> attribute pointing to a subtitles file and a <code>kind</code> attribute, a <code>srclang</code> attribute and a <code>label</code> attribute. You are free to use this subtitles URL if you like: <code>https://se1400.github.io/labs/assets/sample-transcript.vtt</code>

10. Inside the third <code>section</code> element, you should have an <code>h2</code> element for the title of the section eg. "Transcript".

11. Below the <code>h2</code> element, you should have a <code>p</code> element with the transcript of the video.
