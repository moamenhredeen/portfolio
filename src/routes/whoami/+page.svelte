<script lang="ts">
  import Icon from "$lib/components/icon/Icon.svelte";
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
      <img src="images/image.jpg" alt="me" />
    </picture>
    <div class="contact">
      <div class="contact-item">
        <Icon name="github" />
        <a href="https://github.com/moamenhredeen">github/moamenhredeen</a>
      </div>
      <div class="contact-item">
        <Icon name="twitter" />
        <a href="https://github.com/moamenhredeen">github/moamenhredeen</a>
      </div>
      <div class="contact-item">
        <Icon name="linkedin" />
        <a href="https://github.com/moamenhredeen">github/moamenhredeen</a>
      </div>
      <div class="contact-item">
        <Icon name="xing" />
        <a href="https://github.com/moamenhredeen">github/moamenhredeen</a>
      </div>
    </div>
  </section>
</div>

<style lang="scss">
  .root-container {
    margin: 25px 0;
    display: flex;

    section {
      flex: 1;
    }
  }

  .contact {
    margin: 25px 10px;
    .contact-item {
      margin: 10px 0;
      display: flex;
      align-items: center;
      gap: 10px;
      img {
        width: 40px;
        height: 40px;
        border: none;
      }
    }
  }
</style>
