'use client';

import { parseAsBoolean, useQueryState } from 'nuqs';
import { useOptimistic, useState, useTransition, ViewTransition } from 'react';

export default function HomePage() {
  return (
    <div className='grid grid-flow-col grid-rows-[40px_1fr] auto-cols-fr gap-5 m-10'>
      <span>Native state</span>
      <NativeStateTransition />

      <span>Query state</span>
      <QueryStateTransition />

      <span>Query state w/ optimistic</span>
      <OptimisticStateTransition />
    </div>
  );
}

function NativeStateTransition() {
  const [details, setDetails] = useState(false);
  const [pending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(() => {
      setDetails((prev) => !prev);
    });
  };

  return (
    <section className=' border border-gray-200 bg-gray-50 flex flex-col gap-6 p-5'>
      <div className='flex justify-between'>
        {details && (
          <ViewTransition name='native-details'>
            <span>Details</span>
          </ViewTransition>
        )}
        {!details && (
          <ViewTransition name='native-home'>
            <span>Home</span>
          </ViewTransition>
        )}

        <button
          className='border border-gray-400 px-2 py-0.5 bg-white'
          onClick={handleToggle}
        >
          Go to{' '}
          {details && (
            <ViewTransition name='native-home'>
              <span>Home</span>
            </ViewTransition>
          )}
          {!details && (
            <ViewTransition name='native-details'>
              <span>Details</span>
            </ViewTransition>
          )}
        </button>
      </div>
    </section>
  );
}

function QueryStateTransition() {
  const [details, setDetails] = useQueryState(
    'details',
    parseAsBoolean.withDefault(false),
  );
  const [sync, setSync] = useState(true);
  const [, startTransition] = useTransition();

  const handleToggle = async () => {
    if (sync) {
      startTransition(() => {
        setDetails((prev) => !prev);
      });
    } else {
      startTransition(async () => {
        await setDetails((prev) => !prev);
      });
    }
  };

  return (
    <section className=' border border-gray-200 bg-gray-50 flex flex-col gap-6 p-5'>
      <div className='flex justify-between'>
        {details && (
          <ViewTransition name='query-details'>
            <span>Details</span>
          </ViewTransition>
        )}
        {!details && (
          <ViewTransition name='query-home'>
            <span>Home</span>
          </ViewTransition>
        )}

        <button
          className='border border-gray-400 px-2 py-0.5 bg-white'
          onClick={handleToggle}
        >
          Go to{' '}
          {details && (
            <ViewTransition name='query-home'>
              <span>Home</span>
            </ViewTransition>
          )}
          {!details && (
            <ViewTransition name='query-details'>
              <span>Details</span>
            </ViewTransition>
          )}
        </button>
      </div>
      <label className='flex gap-3 items-center'>
        <input
          type='checkbox'
          checked={sync}
          onChange={(e) => setSync(e.target.checked)}
        />
        Sync transition
      </label>
    </section>
  );
}

function OptimisticStateTransition() {
  const [details, setDetails] = useQueryState(
    'optimistic-details',
    parseAsBoolean.withDefault(false),
  );
  const [optimisticDetails, setOptimistic] = useOptimistic(details);
  const [, startTransition] = useTransition();
  const [sync, setSync] = useState(true);

  const handleToggle = async () => {
    if (sync) {
      startTransition(() => {
        setOptimistic((prev) => !prev);
        setDetails((prev) => !prev);
      });
    } else {
      startTransition(async () => {
        setOptimistic((prev) => !prev);
        await setDetails((prev) => !prev);
      });
    }
  };

  console.log({ value: details, optimistic: optimisticDetails });

  return (
    <section className=' border border-gray-200 bg-gray-50 flex flex-col gap-6 p-5'>
      <div className='flex justify-between'>
        {optimisticDetails && (
          <ViewTransition name='optimistic-details'>
            <span>Details</span>
          </ViewTransition>
        )}
        {!optimisticDetails && (
          <ViewTransition name='optimistic-home'>
            <span>Home</span>
          </ViewTransition>
        )}

        <button
          className='border border-gray-400 px-2 py-0.5 bg-white'
          onClick={handleToggle}
        >
          Go to{' '}
          {optimisticDetails && (
            <ViewTransition name='optimistic-home'>
              <span>Home</span>
            </ViewTransition>
          )}
          {!optimisticDetails && (
            <ViewTransition name='optimistic-details'>
              <span>Details</span>
            </ViewTransition>
          )}
        </button>
      </div>
      <label className='flex gap-3 items-center'>
        <input
          type='checkbox'
          checked={sync}
          onChange={(e) => setSync(e.target.checked)}
        />
        Sync transition
      </label>
    </section>
  );
}
