function NewsletterSection() {
  return (
    <section className="bg-[#f7f3ed] py-28">
      <div className="mx-auto max-w-3xl px-6 text-center">

        <p className="mb-4 text-xs uppercase tracking-[4px] text-gray-500">
          Stay Connected
        </p>

        <h2 className="mb-6 text-5xl font-light">
          Join our newsletter
        </h2>

        <p className="mb-10 text-gray-600">
          Receive product updates, exclusive releases,
          and thoughtful content directly in your inbox.
        </p>

        <form className="flex flex-col gap-4 md:flex-row">
          <input
            type="email"
            placeholder="Email Address"
            className="flex-1 border border-black bg-transparent px-5 py-4 outline-none"
          />

          <button
            className="bg-black px-8 py-4 text-white"
            type="submit"
          >
            Subscribe
          </button>
        </form>

      </div>
    </section>
  );
}

export default NewsletterSection;