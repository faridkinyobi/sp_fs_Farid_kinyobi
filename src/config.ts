interface Config {
    api_host_dev?: string;
}

const config: Config = {
    api_host_dev: process.env.NEXT_PUBLIC_API_URL || "",
};

export { config };
