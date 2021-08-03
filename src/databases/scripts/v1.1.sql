ALTER TABLE public.tasks
    ADD COLUMN "createdAt" timestamp without time zone;

ALTER TABLE public.tasks
    ADD COLUMN "updatedAt" timestamp without time zone;