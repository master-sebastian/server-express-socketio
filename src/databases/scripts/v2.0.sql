CREATE TABLE IF NOT EXISTS public.users
(
    id serial NOT NULL,
    username character varying(200) unique COLLATE pg_catalog."default" NOT NULL,
    "password" character varying(1000) COLLATE pg_catalog."default",
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone,
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;