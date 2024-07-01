import { ChevronDownIcon, ChevronDownSquare } from 'lucide-react';
import { Card, CardContent, CardHeader } from '..';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

interface AccordionProps {
  type?: 'single' | 'multiple';
  collapsible?: boolean;
  card?: boolean;
  children?: React.ReactNode;
  title?: string;
}

interface AccordionListProps extends AccordionProps {
  data: any[];
}

interface AccordionListItem {
  title: string;
  body: any;
}

export const AccordionComponent = ({
  type = 'single',
  collapsible = true,
  card,
  children,
  title,
}: AccordionProps) => {
  return (
    <Accordion type={type} collapsible={collapsible}>
      <AccordionItem value="item-1" className={card ? 'border-0' : ''}>
        <AccordionTrigger className="">
          <span className={card ? 'font-bold text-base' : ''}>{title}</span>
          {card ? (
            <ChevronDownSquare className="text-brand h-4 w-4 shrink-0 transition-transform duration-200" />
          ) : (
            <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
          )}
        </AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export const AccordionList = ({
  data = [],
  type = 'single',
  collapsible = true,
  card = false,
}: AccordionListProps) => {
  return (
    <Accordion type={type} collapsible={collapsible}>
      {data.map((item, index) => (
        <AccordionItem
          value={'accordion-' + index}
          className={card ? 'border-0' : ''}
          key={index}
        >
          <AccordionTrigger className="">
            <span className={card ? 'font-bold text-base' : ''}>
              {item.title}
            </span>
            {card ? (
              <ChevronDownSquare className="text-brand h-4 w-4 shrink-0 transition-transform duration-200" />
            ) : (
              <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
            )}
          </AccordionTrigger>
          <AccordionContent>{item.body}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export const AccordionListCard = ({
  data = [],
  type = 'single',
  collapsible = true,
  card = true,
}: AccordionListProps) => {
  return (
    <>
      {data?.map((item: AccordionListItem, index) => (
        <div className="space-y-4 w-full" key={index}>
          <Accordion type={type} collapsible={collapsible}>
            <AccordionItem
              value={'accordion-' + index}
              className={card ? 'border-0' : ''}
              key={index}
            >
              <Card className="p-0 m-0">
                <CardHeader className="mb-0">
                  <AccordionTrigger className="p-6">
                    <span className={card ? 'font-bold text-base' : ''}>
                      {item.title}
                    </span>
                    {card ? (
                      <ChevronDownSquare className="text-brand h-4 w-4 shrink-0 transition-transform duration-200" />
                    ) : (
                      <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                    )}
                  </AccordionTrigger>
                </CardHeader>
                <CardContent className="p-0 m-0">
                  <AccordionContent>{item.body}</AccordionContent>
                </CardContent>
              </Card>
            </AccordionItem>
          </Accordion>
        </div>
      ))}
    </>
  );
};

export const AccordionComponentCard = ({
  type = 'single',
  collapsible = true,
  children,
  title,
}: AccordionProps) => {
  return (
    <Accordion type={type} collapsible={collapsible}>
      <AccordionItem value="item-1" className="border-0">
        <Card className="p-0 m-0">
          <CardHeader className="mb-0">
            <AccordionTrigger className="p-6">
              <span className="font-bold text-base">{title}</span>
              <ChevronDownSquare className="text-brand h-4 w-4 shrink-0 transition-transform duration-200" />
            </AccordionTrigger>
          </CardHeader>
          <CardContent className="p-0 m-0">
            <AccordionContent>{children}</AccordionContent>
          </CardContent>
        </Card>
      </AccordionItem>
    </Accordion>
  );
};
