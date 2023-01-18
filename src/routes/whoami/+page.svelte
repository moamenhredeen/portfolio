
<script lang="ts">
	import image from '$lib/images/image.jpg';
  import githubIcon from '$lib/images/github.svg';
  import twitterIcon from '$lib/images/twitter.svg';
  import xingIcon from '$lib/images/xing.svg';
  import linkedinIcon from '$lib/images/linkedin.svg';
</script>

<svelte:head>
  <title>whoami</title>
</svelte:head>

<div class="root-container">
  <section>
    <h2>Hi there</h2>
    <p>my name is moamen hraden</p>
    <p>i am software developer working in germany</p>
  </section>
  <section>
    <picture>
      <img src={image} alt="Welcome" />
    </picture>
    <div class="contact">
      <div class="contact-item">
        <img src="{githubIcon}" alt="">
        <a href="https://github.com/moamenhredeen">github/moamenhredeen</a>
      </div>
      <div class="contact-item">
        <img src="{twitterIcon}" alt="">
        <a href="https://github.com/moamenhredeen">github/moamenhredeen</a>
      </div>
      <div class="contact-item">
        <img src="{linkedinIcon}" alt="">
        <a href="https://github.com/moamenhredeen">github/moamenhredeen</a>
      </div>
      <div class="contact-item">
        <img src="{xingIcon}" alt="">
        <a href="https://github.com/moamenhredeen">github/moamenhredeen</a>
      </div>
    </div>
  </section>
</div>

<style lang="scss">
  .root-container{
    margin: 25px 0;
    display: flex;
  
    section{
      flex: 1;
    }
  }


  .contact{
    margin: 25px 10px;
    .contact-item{
      margin: 10px 0;
      display: flex;
      align-items: center;
      gap: 10px;
      img{
        width: 40px;
        height: 40px;
        border: none;
      }
    }
  }
</style>