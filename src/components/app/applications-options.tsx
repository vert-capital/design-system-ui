import { LayoutGrid } from "lucide-react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui";

type AppProps = {
  name: string;
  src: string;
  link: string;
  hide?: boolean;
  disabled?: boolean;
};

type Props = {
  apps?: AppProps[];
  className?: string;
};

export function ApplicationsOptions({ apps }: Props) {
  const _apps: AppProps[] = apps || [
    {
      src: "https://vertc-sso-prd.s3.amazonaws.com/apps/vertical-vert-c-ops.svg",
      name: "VERT-C Operações",
      link: "https://app.operacoes.vert-capital.com/",
    },
    {
      src: "https://vertc-sso-prd.s3.amazonaws.com/apps/vertical-vert-c-obrigacoes.svg",
      name: "VERT-C Obrigações",
      link: "https://obrigacoes.vert-capital.com/",
    },
    {
      src: "https://vertc-sso-prd.s3.amazonaws.com/apps/vertical-vert-c-triagem-docs.svg",
      name: "VERT-C Triagem Docs",
      link: "https://triagem.vert-capital.app/",
    },
    {
      src: "https://vertc-sso-prd.s3.amazonaws.com/apps/vertical-vert-c-lastros.svg",
      name: "VERT-C Lastros",
      link: "https://lastros.operacoes.vert-capital.app/",
    },
    {
      src: "https://vertc-sso-prd.s3.amazonaws.com/apps/icon-vert-c-painel-gestao.svg",
      name: "VERT-C Painel de gestão",
      link: "https://gestao.vert-capital.app/",
    },
  ];

  const goLink = (link: string) => {
    window.open(link, "_self");
  };

  const goAll = () => {
    window.open("https://id.vert-capital.com/", "_self");
  };

  return (
    <TooltipProvider delayDuration={0}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="relative flex cursor-pointer items-center justify-end space-x-3 rounded-full text-muted-foreground">
            <Tooltip delayDuration={400}>
              <TooltipTrigger asChild>
                <Button variant={"ghost"} size={"icon"}>
                  <LayoutGrid className="h-4 w-4 fill-muted-foreground stroke-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="flex items-center gap-4">
                Aplicações
              </TooltipContent>
            </Tooltip>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[22rem]" align="end" forceMount>
          <div className="flex w-full flex-col items-center justify-center space-y-3 p-4 pb-0">
            <div className="grid h-full w-full grid-cols-3 gap-4">
              {_apps.map((app) => (
                <Tooltip delayDuration={400} key={app.name}>
                  <TooltipTrigger asChild>
                    <div
                      onClick={() => goLink(app.link)}
                      className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 hover:bg-brand/10"
                    >
                      <img
                        src={app.src}
                        alt={app.name}
                        className="h-[auto] w-24 rounded-sm"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    className="flex items-center gap-4"
                  >
                    {app.name}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
            <Button variant={"ghost"} onClick={goAll}>
              Ver todas as aplicações
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
}
