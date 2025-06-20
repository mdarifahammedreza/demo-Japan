"use client";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-green-50 to-green-100 text-gray-900 px-6 py-5">
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="md:col-span-2 text-center max-w-3xl mx-auto ">
          <h1 className="text-5xl font-extrabold text-green-800 tracking-tight mb-4">
            About Us
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            At{" "}
            <span className="font-semibold text-green-700">ClimateAware</span>,
            our mission is simple yet urgent: raise awareness, inspire action,
            and support solutions to combat the global climate crisis. We are a
            passionate group of scientists, developers, educators, and advocates
            working for a sustainable planet.
          </p>
        </div>
        <blockquote className="md:col-span-2 bg-green-100 border-l-4 border-green-600 text-green-900 p-6 rounded-xl max-w-3xl mx-auto text-lg font-medium italic shadow-sm ">
          🌿 “We do not inherit the Earth from our ancestors, we borrow it from
          our children.” – Native Proverb
        </blockquote>
        <article className="bg-white rounded-2xl shadow-md p-8 flex flex-col">
          <h2 className="text-3xl font-semibold text-green-700 mb-4 flex items-center gap-3">
            <span>🌱</span> Why Climate Change Matters
          </h2>
          <p className="text-gray-700 leading-relaxed flex-grow">
            Climate change is not a distant threat—it's happening now. Rising
            sea levels, extreme weather, deforestation, and biodiversity loss
            impact health, food security, and global stability. Informed
            communities can drive powerful change.
          </p>
        </article>

        <article className="bg-white rounded-2xl shadow-md p-8 flex flex-col">
          <h2 className="text-3xl font-semibold text-green-700 mb-4 flex items-center gap-3">
            <span>📊</span> What We Do
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed flex-grow">
            <li>
              Provide data-driven insights and visuals explaining climate
              science
            </li>
            <li>
              Share educational resources for schools, activists, and the public
            </li>
            <li>Support environmental campaigns and green innovations</li>
            <li>Host community events and discussions on sustainability</li>
          </ul>
        </article>

        <article className="bg-white rounded-2xl shadow-md p-8 flex flex-col">
          <h2 className="text-3xl font-semibold text-green-700 mb-4 flex items-center gap-3">
            <span>🌍</span> Our Vision
          </h2>
          <p className="text-gray-700 leading-relaxed flex-grow">
            We envision a world where humanity lives in harmony with nature —
            where everyone recognizes their role in preserving the planet. By
            merging technology, science, and grassroots activism, we empower
            real-world solutions.
          </p>
        </article>

        <article className="bg-white rounded-2xl shadow-md p-8 flex flex-col">
          <h2 className="text-3xl font-semibold text-green-700 mb-4 flex items-center gap-3">
            <span>🤝</span> Get Involved
          </h2>
          <p className="text-gray-700 leading-relaxed flex-grow">
            Whether you’re a student, researcher, artist, or business owner —
            your voice matters. Join our mission by subscribing to our
            newsletter, contributing content, or collaborating on climate
            projects. Together, we build a greener future.
          </p>
        </article>
      </section>
    </div>
  );
}
