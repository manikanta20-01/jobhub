## Error Type
Console Error

## Error Message
In HTML, <a> cannot be a descendant of <a>.
This will cause a hydration error.

  ...
    <RedirectBoundary>
      <RedirectErrorBoundary router={{...}}>
        <InnerLayoutRouter url="/" tree={[...]} params={{}} cacheNode={{rsc:{...}, ...}} segmentPath={[...]} ...>
          <SegmentViewNode type="page" pagePath="page.tsx">
            <SegmentTrieNode>
            <HomePage>
              <div className="max-w-7xl ...">
                <div>
                <div>
                <div className="grid grid-...">
                  <div className="lg:col-span-3">
                    <JobListWrapper allJobs={[...]} locations={[...]} tags={[...]}>
                      <div>
                      <div>
                      <div className="grid grid-...">
                        <JobCard job={{id:"softwa...", ...}}>
                          <LinkComponent href="/jobs/soft...">
>                           <a
>                             ref={function}
>                             onClick={function onClick}
>                             onMouseEnter={function onMouseEnter}
>                             onTouchStart={function onTouchStart}
>                             href="/jobs/software-engineer-google/"
>                           >
                              <article className="job-card b...">
                                <div className="p-5">
                                  <div className="flex items...">
                                    <div>
                                    <div className="flex-1 min...">
                                      <h3>
                                      <p>
                                      <div>
                                      <div>
>                                     <a
>                                       href="https://careers.google.com/jobs/software-engineer-bangalore"
>                                       target="_blank"
>                                       rel="noopener noreferrer"
>                                       onClick={function onClick}
>                                       className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2..."
>                                     >
                        ...
                      ...
                    ...
                  ...
          ...
        ...



    at a (<anonymous>:null:null)
    at JobCard (components/JobCard.tsx:78:17)
    at <unknown> (components/JobListWrapper.tsx:158:15)
    at Array.map (<anonymous>:null:null)
    at JobListWrapper (components/JobListWrapper.tsx:157:28)
    at HomePage (app/page.tsx:46:11)

## Code Frame
  76 |               {/* Apply Button */}
  77 |               {job.applyLink ? (
> 78 |                 <a
     |                 ^
  79 |                   href={job.applyLink}
  80 |                   target="_blank"
  81 |                   rel="noopener noreferrer"

Next.js version: 16.2.3 (Turbopack)

=================================================

## Error Type
Console Error

## Error Message
<a> cannot contain a nested <a>.
See this log for the ancestor stack trace.


    at a (<anonymous>:null:null)
    at JobCard (components/JobCard.tsx:30:5)
    at <unknown> (components/JobListWrapper.tsx:158:15)
    at Array.map (<anonymous>:null:null)
    at JobListWrapper (components/JobListWrapper.tsx:157:28)
    at HomePage (app/page.tsx:46:11)

## Code Frame
  28 |
  29 |   return (
> 30 |     <Link href={`/jobs/${job.slug}`}>
     |     ^
  31 |       <article className="job-card bg-white rounded-xl border border-g...
  32 |         <div className="p-5">
  33 |           <div className="flex items-start gap-4">

Next.js version: 16.2.3 (Turbopack)
