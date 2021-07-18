--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 13.3

-- Started on 2021-07-18 16:43:08

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2989 (class 1262 OID 16446)
-- Name: stock_db; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE stock_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';


ALTER DATABASE stock_db OWNER TO postgres;

\connect stock_db

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 201 (class 1259 OID 16480)
-- Name: stock_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stock_user (
    user_id integer NOT NULL,
    first_name character varying(250),
    last_name character varying(250),
    email character varying(250),
    password character varying(250)
);


ALTER TABLE public.stock_user OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 16478)
-- Name: stock_user_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.stock_user_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.stock_user_user_id_seq OWNER TO postgres;

--
-- TOC entry 2990 (class 0 OID 0)
-- Dependencies: 200
-- Name: stock_user_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.stock_user_user_id_seq OWNED BY public.stock_user.user_id;


--
-- TOC entry 2851 (class 2604 OID 16483)
-- Name: stock_user user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stock_user ALTER COLUMN user_id SET DEFAULT nextval('public.stock_user_user_id_seq'::regclass);


--
-- TOC entry 2853 (class 2606 OID 16488)
-- Name: stock_user stock_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stock_user
    ADD CONSTRAINT stock_user_pkey PRIMARY KEY (user_id);


-- Completed on 2021-07-18 16:43:13

--
-- PostgreSQL database dump complete
--

