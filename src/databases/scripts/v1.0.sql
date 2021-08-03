CREATE TABLE IF NOT EXISTS public.tasks
(
    id bigint NOT NULL DEFAULT nextval('tasks_id_seq'::regclass),
    name character varying(200) COLLATE pg_catalog."default" NOT NULL,
    description character varying(2000) COLLATE pg_catalog."default",
    CONSTRAINT tasks_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;
--
--ALTER TABLE public.tasks
--    OWNER to postgres;